const fs = require('fs');
const csv = require('csv-parser');
const prisma = require("./src/config/database");
const { dataset } = require("./src/config/variables");

const cleanValue = (value) => {
    if (!value) {
        return '';
    }
    return value.replace(/\u00A0/g, ' ').trim();
};

const initDatabase = async () => {
    const restaurants = [];

    fs.createReadStream(dataset)
        .pipe(csv())
        .on('data', (row) => {
            const name = cleanValue(row['Nama Resto']);
            const address = cleanValue(row['alamat']);
            const region = cleanValue(row['daerah']);
            const openHours = cleanValue(row['buka_tutup']);
            const openTime = cleanValue(row['jam_buka']);
            const closeTime = cleanValue(row['jam_tutup']);
            const priceRange = cleanValue(row['harga_semua']);
            const minPrice = cleanValue(row['harga_awal']) ? parseFloat(row['harga_awal'].replace(/,/g, '')) : null;
            const maxPrice = cleanValue(row['harga_akhir']) ? parseFloat(row['harga_akhir'].replace(/,/g, '')) : null;
            const avgPrice = cleanValue(row['rata_rata']) ? parseFloat(row['rata_rata'].replace(/,/g, '')) : null;
            const rating = cleanValue(row['rating']) ? parseFloat(row['rating']) : null;
            const phone = cleanValue(row['telepon']);
            const type = cleanValue(row['tipe']);
            const menus = cleanValue(row['menu']).split(',').map(item => item.trim());
            const reviews = cleanValue(row['review ']).split('.').map(item => item.trim());

            if (name && address && region && openHours && priceRange && minPrice !== null && maxPrice !== null && avgPrice !== null && rating !== null) {
                restaurants.push({
                    name,
                    address,
                    region,
                    openHours,
                    openTime,
                    closeTime,
                    priceRange,
                    minPrice,
                    maxPrice,
                    avgPrice,
                    rating,
                    phone,
                    type,
                    menus,
                    reviews
                });
            }
        })
        .on('end', async () => {
            console.log('CSV file successfully processed');
            try {
                for (const restaurant of restaurants) {
                    const typeRecord = await prisma.type.upsert({
                        where: { name: restaurant.type },
                        update: {},
                        create: { name: restaurant.type }
                    });

                    const restaurantRecord = await prisma.restaurant.create({
                        data: {
                            name: restaurant.name,
                            address: restaurant.address,
                            region: restaurant.region,
                            openHours: restaurant.openHours,
                            openTime: restaurant.openTime,
                            closeTime: restaurant.closeTime,
                            priceRange: restaurant.priceRange,
                            minPrice: restaurant.minPrice,
                            maxPrice: restaurant.maxPrice,
                            avgPrice: restaurant.avgPrice,
                            rating: restaurant.rating,
                            phone: restaurant.phone,
                            typeId: typeRecord["id"]
                        }
                    });

                    // Create menus and connect them to the restaurant
                    await Promise.all(restaurant.menus.map(async menuName => {
                        await prisma.menu.create({
                            data: {
                                name: menuName,
                                restaurantId: restaurantRecord["id"]
                            }
                        });
                    }));

                    await Promise.all(restaurant.reviews.map(async reviewContent => {
                        await prisma.review.create({
                            data: {
                                content: reviewContent,
                                restaurantId: restaurantRecord["id"]
                            }
                        });
                    }));
                }
                console.log('Data successfully inserted into database');
            } catch (error) {
                console.error('Error inserting data into database', error);
            } finally {
                await prisma.$disconnect();
            }
        });
};

initDatabase().then();
