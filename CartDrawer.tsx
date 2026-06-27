/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Review } from './types';

export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'grid_view', color: 'bg-surface-container-high/40' },
  { id: 'crochet-flowers', name: 'Crochet Flowers', icon: 'local_florist', color: 'bg-primary-container/20' },
  { id: 'bouquets', name: 'Bouquets', icon: 'bouquet', color: 'bg-tertiary-container/20' },
  { id: 'jewelry', name: 'Jewelry', icon: 'diamond', color: 'bg-secondary-container/20' },
  { id: 'keychains', name: 'Keychains', icon: 'key', color: 'bg-surface-container-high/50' },
  { id: 'brooches', name: 'Brooches', icon: 'auto_awesome', color: 'bg-primary-fixed-dim/20' },
  { id: 'bags', name: 'Bags', icon: 'shopping_basket', color: 'bg-tertiary-fixed-dim/20' }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Eternal Rose & Lavender Bouquet',
    category: 'bouquets',
    price: 1800,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDpDaPtwH_-XgmocpbC2TRjoQzzDG00zog44VCde83AFXfSVDoIUdV33OlUfjmVb5RPnonH7Te_ZYNFrjcN6hL40p3XhwzZnykK5etoXtt67YLFiXw4BfrmAR70AdkGMSN9K-bLPo8m9dFBgpZj7bxBTf2-JM2kEZfni_i_czYbA-wTwd8DYsOyT5KIaxEW-0c-DX6u2af7GKATtahyQQd1k4_Cu-IvD-kVrr25nxnY9smwV4FlSu_c9DMjTWrZMqQ0rPlWRfvEos',
    description: 'A beautiful mixed bouquet featuring handcrafted pink crochet roses, delicate white chamomile daisies, and lavender sprigs tied with a luxurious cream satin ribbon. Perfect for graduation, birthdays, or an everlasting expression of love.',
    rating: 4.9,
    reviewsCount: 18,
    stockStatus: 'In Stock',
    features: ['100% Cotton Yarn', 'Everlasting flowers that never wilt', 'Customizable colors available', 'Hand-tied with silk ribbon'],
    isCustomizable: true
  },
  {
    id: 'p2',
    name: 'Kawaii White Kitty Keychain',
    category: 'keychains',
    price: 450,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPcC2SklCQf6VvV60YycSEffVQv02fgBC34rdqn0-CZydU2uf6tv3ZBMSGO8wuEqy18h7ki7Y8Ea1y0WEgSVvtvi8vV7TdTc-qS6M4rT5NQpgXYcApMCeWv_T6nP9J1U78N1yX2ohqVue38sUZq3KHLuUwuI373ms7GqG6ypBdP-H-phqThKsmMM_t9N_vsSUxmPxhBIvvgyylt_6sAOn2LkWsQGhqC-9d8Wk2vNOlQtj073fS7fDgfTIpIh_spNFlOFuQ0GBoYX0',
    description: 'An incredibly cute, tiny handmade crochet keychain in the shape of a white kitten wearing a charming pink bow. Carefully stitched using premium soft fuzzy yarn with security eyes. Sturdy golden ring attached.',
    rating: 5.0,
    reviewsCount: 12,
    stockStatus: 'Low Stock',
    features: ['High-quality soft fuzzy yarn', 'Durable gold-plated keychain clasp', 'Filled with premium hypo-allergenic fiberfill', 'Pocket size (approx. 5cm tall)'],
    isCustomizable: true
  },
  {
    id: 'p3',
    name: 'Petite Pastel Tulip & Daisy Mini Bouquet',
    category: 'bouquets',
    price: 1200,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9lzmsyI-_0bA_JeV-szeqU4FbdB7Xbwpv5cUuPyQdr6WyUYgS_nCTO9Z01DRTNYXlv7JuvSD9rvyNYapC3RAmigS3I79Yx7u9N9H8LqchK7_o85p1oj4E6440eA1DsXoNQPq8tT24fMbiU4JRRw_ARgwwu0cTZAcb_W6MNRzBQfqgDvMjmTxctFKX8rColRDHFRT4NtxR9CpKCZ9gUfXjnujnLDZJIlok_NH6AW4sJgwTY5T_lqlzvElLtQN6U27V58mguA-U60o',
    description: 'A charming mini arrangement featuring soft yellow tulips, cream-colored daisies, and rich green leaves. Wrapped in rustic aesthetic paper and tied with a dainty bow. The perfect desktop companion or token of appreciation.',
    rating: 4.8,
    reviewsCount: 15,
    stockStatus: 'In Stock',
    features: ['Vibrant, high-saturation color yarns', 'Wrapped in premium Korean-style flower paper', 'Compact and sturdy stem support', 'Dust-resistant and easy to clean'],
    isCustomizable: true
  },
  {
    id: 'p4',
    name: 'Bespoke Beaded Floral Charm Bracelet',
    category: 'jewelry',
    price: 350,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBi7iYN8aWExmGzBFRQ9YIsnQYSuED1iVLM6WBodU6N_uhBDlZrLv6385tHSFgtWC53dHDVlNb-AabC_mZWct-SzhKIN0Mq5P08Y7snW4VV4deohmhvX2hD7mw8rYUsQGsePbWrGBe-Lo93ffrvE-COmlwALphARSHqvwN2yayqZ5ddBKOqcBGHC-EJdOijjKSBH572fwISP-seq4b12gSOoBJSGwQ8ngu3hXa4R-uHWZCB5ojEEGjITuSWEUI9_eYTR0HRvTruDqc',
    description: 'A delicate beaded bracelet with dainty pastel seed beads, custom name letter charms (optional), and an adorable miniature crochet pink flower charm. Has a sturdy elastic band designed to fit comfortably.',
    rating: 4.9,
    reviewsCount: 8,
    stockStatus: 'In Stock',
    features: ['Premium Japanese seed glass beads', 'Handmade crochet cotton flower charm', 'Stretch-to-fit ultra-durable string', 'Personalization with initials available'],
    isCustomizable: true
  },
  {
    id: 'p5',
    name: 'Sweet Lavender Stems (Set of 3)',
    category: 'crochet-flowers',
    price: 600,
    image: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&q=80&w=600',
    description: 'An elegant bunch of three lavender sprigs in different shades of pastel purple. Beautifully structured with flexible inner stems, allowing you to shape them to fit any vase or container.',
    rating: 4.7,
    reviewsCount: 6,
    stockStatus: 'In Stock',
    features: ['Three individual lavender stems', 'Flexible wire core for easy styling', 'Infused with lavender essential oil for a gentle scent', 'Zero-maintenance home decor item'],
    isCustomizable: false
  },
  {
    id: 'p6',
    name: 'Fuzzy Daisy Pin Brooch',
    category: 'brooches',
    price: 280,
    image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=600',
    description: 'A cozy, cute flower brooch crafted with fuzzy chenille yarn for a soft, tactile feel. Pin it on your denim jacket, backpack, tote bag, or beanie to add an instant touch of cozy whimsical flair!',
    rating: 5.0,
    reviewsCount: 4,
    stockStatus: 'In Stock',
    features: ['Super soft chenille fuzzy yarn', 'Secure silver-plated safety pin backing', 'Hand-stitched detailing', 'Diameter: approx. 6cm'],
    isCustomizable: true
  },
  {
    id: 'p7',
    name: 'Pastel Patchwork Tote Bag',
    category: 'bags',
    price: 2400,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600',
    description: 'A spacious and highly durable handmade crochet tote bag styled with gorgeous pastel square patches. Fully lined inside with a magnetic clasp closure and a small pocket for your keys and phone.',
    rating: 4.9,
    reviewsCount: 9,
    stockStatus: 'Made to Order',
    features: ['Sturdy double-yarn construction', 'Soft inner cotton lining', 'Inner pocket and magnetic button closure', 'Generous strap length for over-the-shoulder wear'],
    isCustomizable: true
  },
  {
    id: 'p8',
    name: 'Blooming Sunflower Desk Companion',
    category: 'crochet-flowers',
    price: 450,
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80&w=600',
    description: 'A cheerful single crochet sunflower mounted on a stable base or flexible pot, designed to bring bright, warm sunshine to your study desk, work cubicle, or bedroom nightstand.',
    rating: 5.0,
    reviewsCount: 11,
    stockStatus: 'In Stock',
    features: ['Bright sunflower yellow and deep brown yarn', 'Flexible, posable leaf stems', 'Provides positive, warm desk energy', 'Great miniature gift item'],
    isCustomizable: false
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    productId: 'p1',
    author: 'Suman Shrestha',
    rating: 5,
    comment: 'The bouquet is so beautiful and smells like heaven! Anshika wrapped it so elegantly. Best gift ever.',
    date: '2026-06-15'
  },
  {
    id: 'r2',
    productId: 'p7',
    author: 'Priya Karki',
    rating: 5,
    comment: 'Requested a custom lavender-themed bag and Anshika did a perfect job. Stitches are neat and sturdy. Truly talented!',
    date: '2026-06-18'
  },
  {
    id: 'r3',
    productId: 'p2',
    author: 'Neha Gupta',
    rating: 5,
    comment: 'The packaging was so adorable with little kitty stamps! The keychain itself is super soft. Will buy again!',
    date: '2026-06-20'
  },
  {
    id: 'r4',
    productId: 'p4',
    author: 'Aarav Joshi',
    rating: 5,
    comment: 'Bought this bracelet for my sister with her initials. She is obsessed! The miniature flower charm is cute.',
    date: '2026-06-22'
  },
  {
    id: 'r5',
    productId: 'p3',
    author: 'Ishani Thapa',
    rating: 4,
    comment: 'Sweetest seller! The tulip bouquet is lovely and brightens my desk. Highly recommend handmade over real flowers!',
    date: '2026-06-25'
  }
];

export const FAQS = [
  {
    question: 'How do I request a custom order?',
    answer: 'You can use our Custom Order tab to configure your item, select colors, add references, and calculate an estimate. After submitting, we will contact you on Instagram (@prettykitty.888) or WhatsApp to finalize the details!'
  },
  {
    question: 'Where do you deliver and what are the charges?',
    answer: 'We deliver all across Nepal! Delivery inside Kathmandu Valley takes 1-3 business days (Rs. 100), and outside KTM takes 3-7 business days via courier services (Rs. 150-200).'
  },
  {
    question: 'Can I choose custom yarn colors for a bouquet?',
    answer: 'Absolutely! Most of our bouquets are made to order, and you can request custom color pairings for roses, tulips, lavenders, and daisy stems without extra charges.'
  },
  {
    question: 'How do I care for my crochet flowers?',
    answer: 'Crochet flowers are everlasting! Simply use a hair dryer on a cold, low setting or a soft brush to gently blow away any accumulated dust once in a while. Keep them away from damp environments.'
  }
];
