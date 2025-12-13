export const playerImages = {
    'Novak Djokovic': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Novak_Djokovic_at_the_2024_Australian_Open_%281%29_%28cropped%29.jpg/640px-Novak_Djokovic_at_the_2024_Australian_Open_%281%29_%28cropped%29.jpg',
    'Carlos Alcaraz': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Carlos_Alcaraz_2023_US_Open_%28cropped%29.jpg/640px-Carlos_Alcaraz_2023_US_Open_%28cropped%29.jpg',
    'Daniil Medvedev': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Daniil_Medvedev_2024_Australian_Open_%283%29.jpg/640px-Daniil_Medvedev_2024_Australian_Open_%283%29.jpg',
    'Jannik Sinner': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Jannik_Sinner_2024_Australian_Open_%284%29_%28cropped%29.jpg/640px-Jannik_Sinner_2024_Australian_Open_%284%29_%28cropped%29.jpg',
    'Andrey Rublev': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Andrey_Rublev_2023_Monte-Carlo_Masters.jpg/640px-Andrey_Rublev_2023_Monte-Carlo_Masters.jpg',
    'Stefanos Tsitsipas': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Stefanos_Tsitsipas_2023_Monte-Carlo_Masters_%28cropped%29.jpg/640px-Stefanos_Tsitsipas_2023_Monte-Carlo_Masters_%28cropped%29.jpg',
    'Alexander Zverev': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Alexander_Zverev_2023_Monte-Carlo_Masters.jpg/640px-Alexander_Zverev_2023_Monte-Carlo_Masters.jpg',
    'Holger Rune': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Holger_Rune_2023_Monte-Carlo_Masters.jpg/640px-Holger_Rune_2023_Monte-Carlo_Masters.jpg',
    'Rafael Nadal': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Rafael_Nadal_2024_Brisbane_International.jpg/640px-Rafael_Nadal_2024_Brisbane_International.jpg',
    'Dominic Thiem': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Dominic_Thiem_2023_US_Open_%281%29_%28cropped%29.jpg/640px-Dominic_Thiem_2023_US_Open_%281%29_%28cropped%29.jpg',
    'Iga Swiatek': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Iga_Swiatek_2023_US_Open_%281%29.jpg/640px-Iga_Swiatek_2023_US_Open_%281%29.jpg',
    'Coco Gauff': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Coco_Gauff_2023_US_Open_%282%29.jpg/640px-Coco_Gauff_2023_US_Open_%282%29.jpg',
    'Aryna Sabalenka': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Aryna_Sabalenka_2023_US_Open_%281%29.jpg/640px-Aryna_Sabalenka_2023_US_Open_%281%29.jpg',
    'Elena Rybakina': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Elena_Rybakina_2023_US_Open_%281%29.jpg/640px-Elena_Rybakina_2023_US_Open_%281%29.jpg',
    'Casper Ruud': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Casper_Ruud_2023_US_Open_%281%29.jpg/640px-Casper_Ruud_2023_US_Open_%281%29.jpg',
    'Ben Shelton': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Ben_Shelton_2023_US_Open.jpg/640px-Ben_Shelton_2023_US_Open.jpg',
    'Frances Tiafoe': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Frances_Tiafoe_2023_US_Open_%281%29.jpg/640px-Frances_Tiafoe_2023_US_Open_%281%29.jpg'
};

export const getFallbackImage = (name) => {
    const encodedName = encodeURIComponent(name);
    return `https://ui-avatars.com/api/?name=${encodedName}&background=0F172A&color=fff&size=256&font-size=0.33`;
};

export const getPlayerImage = (name) => {
    // If we have a specific image, use it
    if (playerImages[name]) {
        return playerImages[name];
    }

    return getFallbackImage(name);
};
