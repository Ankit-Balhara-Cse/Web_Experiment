const products = [
  {
    id: 1,
    name: "Sony WH-1000XM5 Headphones",
    price: 349.99,
    category: "audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&auto=format",
    rating: 4.8,
    description: "Industry-leading noise cancellation with 30-hour battery life and crystal-clear hands-free calling."
  },
  {
    id: 2,
    name: "Logitech G Pro X Superlight 2",
    price: 159.99,
    category: "peripherals",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop&auto=format",
    rating: 4.9,
    description: "Ultra-lightweight wireless gaming mouse at 60g with HERO 25K sensor for pro-level precision."
  },
  {
    id: 3,
    name: "Samsung 49\" Odyssey G9 Monitor",
    price: 1199.99,
    category: "monitors",
    image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=400&h=300&fit=crop&auto=format",
    rating: 4.6,
    description: "Dual QHD curved gaming monitor with 240Hz refresh rate and 1ms response time for immersive play."
  },
  {
    id: 4,
    name: "Nvidia GeForce RTX 4080 Super",
    price: 999.99,
    category: "components",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=300&fit=crop&auto=format",
    rating: 4.7,
    description: "High-performance GPU with 16GB GDDR6X memory, DLSS 3.5, and ray tracing for 4K gaming."
  },
  {
    id: 5,
    name: "Keychron Q1 Pro Mechanical Keyboard",
    price: 199.99,
    category: "peripherals",
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=300&fit=crop&auto=format",
    rating: 4.8,
    description: "Wireless QMK/VIA-compatible 75% layout keyboard with a gasket-mounted, CNC-aluminium body."
  },
  {
    id: 6,
    name: "Elgato Stream Deck MK.2",
    price: 149.99,
    category: "streaming",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=300&fit=crop&auto=format",
    rating: 4.7,
    description: "15 customisable LCD keys to control your streaming setup, apps, and creative tools instantly."
  },
  {
    id: 7,
    name: "AMD Ryzen 9 7950X Processor",
    price: 549.99,
    category: "components",
    image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop&auto=format",
    rating: 4.9,
    description: "16-core, 32-thread powerhouse built on the Zen 4 architecture with a 5.7GHz max boost clock."
  },
  {
    id: 8,
    name: "Razer BlackShark V2 Pro",
    price: 179.99,
    category: "audio",
    image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=300&fit=crop&auto=format",
    rating: 4.6,
    description: "Wireless esports headset with THX 7.1 Spatial Audio and HyperClear Supercardioid Mic technology."
  },
  {
    id: 9,
    name: "Corsair iCUE H150i Elite Capellix",
    price: 219.99,
    category: "components",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=300&fit=crop&auto=format",
    rating: 4.5,
    description: "360mm all-in-one liquid CPU cooler with 33 vibrant RGB LEDs and ultra-low noise pump design."
  },
  {
    id: 10,
    name: "ASUS ROG Swift OLED PG27AQDP",
    price: 799.99,
    category: "monitors",
    image: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=400&h=300&fit=crop&auto=format",
    rating: 4.8,
    description: "27-inch QHD OLED gaming monitor with a blazing 240Hz refresh rate and 0.03ms response time."
  },
  {
    id: 11,
    name: "SteelSeries Arctis Nova Pro",
    price: 249.99,
    category: "audio",
    image: "https://images.unsplash.com/photo-1563396983906-b3795482a59a?w=400&h=300&fit=crop&auto=format",
    rating: 4.7,
    description: "Hi-Fi gaming headset with active noise cancellation, multi-system connect, and hot-swap battery system."
  },
  {
    id: 12,
    name: "Samsung 990 Pro 2TB NVMe SSD",
    price: 179.99,
    category: "storage",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop&auto=format",
    rating: 4.8,
    description: "PCIe 4.0 NVMe SSD with read speeds up to 7,450 MB/s, ideal for gaming and content creation."
  },
  {
    id: 13,
    name: "Elgato 4K60 Pro MK.2 Capture Card",
    price: 199.99,
    category: "streaming",
    image: "https://images.unsplash.com/photo-1492011221367-f47e3ccd77a0?w=400&h=300&fit=crop&auto=format",
    rating: 4.6,
    description: "Internal PCIe capture card for recording and streaming at 4K60 HDR10 with ultra-low latency."
  },
  {
    id: 14,
    name: "G.Skill Trident Z5 RGB 32GB DDR5",
    price: 129.99,
    category: "components",
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=300&fit=crop&auto=format",
    rating: 4.7,
    description: "Dual-channel 32GB DDR5-6400 kit with addressable RGB lighting and an aluminium heat spreader."
  },
  {
    id: 15,
    name: "Rode NT-USB Mini Microphone",
    price: 99.99,
    category: "streaming",
    image: "https://images.unsplash.com/photo-1520170350707-b2da59970118?w=400&h=300&fit=crop&auto=format",
    rating: 4.6,
    description: "Plug-and-play studio-quality USB condenser microphone with a built-in pop filter and magnetic desk stand."
  }
];