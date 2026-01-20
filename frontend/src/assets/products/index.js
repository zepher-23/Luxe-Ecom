import cashmere_sweater_srcset from './cashmere_sweater.png?w=300;600;900&format=webp&as=srcset';
import cashmere_sweater_src from './cashmere_sweater.png?w=900&format=webp&as=src';

import chelsea_boots_srcset from './chelsea_boots.png?w=300;600;900&format=webp&as=srcset';
import chelsea_boots_src from './chelsea_boots.png?w=900&format=webp&as=src';

import classic_watch_srcset from './classic_watch.png?w=300;600;900&format=webp&as=srcset';
import classic_watch_src from './classic_watch.png?w=900&format=webp&as=src';

import evening_clutch_srcset from './evening_clutch.png?w=300;600;900&format=webp&as=srcset';
import evening_clutch_src from './evening_clutch.png?w=900&format=webp&as=src';

import geometric_sunglasses_srcset from './geometric_sunglasses.png?w=300;600;900&format=webp&as=srcset';
import geometric_sunglasses_src from './geometric_sunglasses.png?w=900&format=webp&as=src';

import leather_belt_srcset from './leather_belt.png?w=300;600;900&format=webp&as=srcset';
import leather_belt_src from './leather_belt.png?w=900&format=webp&as=src';

import linen_blazer_srcset from './linen_blazer.png?w=300;600;900&format=webp&as=srcset';
import linen_blazer_src from './linen_blazer.png?w=900&format=webp&as=src';

import minimalist_trench_srcset from './minimalist_trench.png?w=300;600;900&format=webp&as=srcset';
import minimalist_trench_src from './minimalist_trench.png?w=900&format=webp&as=src';

import modern_loafers_srcset from './modern_loafers.png?w=300;600;900&format=webp&as=srcset';
import modern_loafers_src from './modern_loafers.png?w=900&format=webp&as=src';

import oxford_shirt_srcset from './oxford_shirt.png?w=300;600;900&format=webp&as=srcset';
import oxford_shirt_src from './oxford_shirt.png?w=900&format=webp&as=src';

import pleated_trousers_srcset from './pleated_trousers.png?w=300;600;900&format=webp&as=srcset';
import pleated_trousers_src from './pleated_trousers.png?w=900&format=webp&as=src';

import silk_scarf_srcset from './silk_scarf.png?w=300;600;900&format=webp&as=srcset';
import silk_scarf_src from './silk_scarf.png?w=900&format=webp&as=src';

import structured_tote_srcset from './structured_tote.png?w=300;600;900&format=webp&as=srcset';
import structured_tote_src from './structured_tote.png?w=900&format=webp&as=src';

import weekender_bag_srcset from './weekender_bag.png?w=300;600;900&format=webp&as=srcset';
import weekender_bag_src from './weekender_bag.png?w=900&format=webp&as=src';


const productImages = {
    "cashmere_sweater": { src: cashmere_sweater_src, srcSet: cashmere_sweater_srcset },
    "chelsea_boots": { src: chelsea_boots_src, srcSet: chelsea_boots_srcset },
    "classic_watch": { src: classic_watch_src, srcSet: classic_watch_srcset },
    "evening_clutch": { src: evening_clutch_src, srcSet: evening_clutch_srcset },
    "geometric_sunglasses": { src: geometric_sunglasses_src, srcSet: geometric_sunglasses_srcset },
    "leather_belt": { src: leather_belt_src, srcSet: leather_belt_srcset },
    "linen_blazer": { src: linen_blazer_src, srcSet: linen_blazer_srcset },
    "minimalist_trench": { src: minimalist_trench_src, srcSet: minimalist_trench_srcset },
    "modern_loafers": { src: modern_loafers_src, srcSet: modern_loafers_srcset },
    "oxford_shirt": { src: oxford_shirt_src, srcSet: oxford_shirt_srcset },
    "pleated_trousers": { src: pleated_trousers_src, srcSet: pleated_trousers_srcset },
    "silk_scarf": { src: silk_scarf_src, srcSet: silk_scarf_srcset },
    "structured_tote": { src: structured_tote_src, srcSet: structured_tote_srcset },
    "weekender_bag": { src: weekender_bag_src, srcSet: weekender_bag_srcset },
};

export default productImages;

export const getOptimizedImage = (dbPath) => {
    if (!dbPath) return { src: '', srcSet: '' };

    // Extract filename without extension from path like "/products/minimalist_trench.png"
    const filename = dbPath.split('/').pop().replace(/\.[^/.]+$/, "");

    return productImages[filename] || { src: dbPath, srcSet: '' };
};
