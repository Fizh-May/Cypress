export const PRODUCTS = [
    {
        id: 1,
        name: 'Laptop Pro X',
        price: 25990000,
        category: 'Electronics',
        rating: 4.8,
        stock: 12,
        image: '💻',
        description: 'Laptop hiệu năng cao cho công việc chuyên nghiệp.',
    },
    {
        id: 2,
        name: 'Wireless Headphones',
        price: 3490000,
        category: 'Electronics',
        rating: 4.5,
        stock: 30,
        image: '🎧',
        description: 'Tai nghe không dây chống ồn chủ động.',
    },
    {
        id: 3,
        name: 'Mechanical Keyboard',
        price: 2150000,
        category: 'Electronics',
        rating: 4.7,
        stock: 25,
        image: '⌨️',
        description: 'Bàn phím cơ RGB với switch Cherry MX.',
    },
    {
        id: 4,
        name: 'Running Shoes',
        price: 1890000,
        category: 'Sports',
        rating: 4.6,
        stock: 50,
        image: '👟',
        description: 'Giày chạy bộ nhẹ và thoáng khí.',
    },
    {
        id: 5,
        name: 'Yoga Mat',
        price: 590000,
        category: 'Sports',
        rating: 4.3,
        stock: 40,
        image: '🧘',
        description: 'Thảm yoga chống trượt cao cấp.',
    },
    {
        id: 6,
        name: 'Coffee Maker',
        price: 1250000,
        category: 'Kitchen',
        rating: 4.4,
        stock: 18,
        image: '☕',
        description: 'Máy pha cà phê tự động thông minh.',
    },
    {
        id: 7,
        name: 'Smart Watch',
        price: 5990000,
        category: 'Electronics',
        rating: 4.6,
        stock: 0,
        image: '⌚',
        description: 'Đồng hồ thông minh theo dõi sức khỏe.',
    },
    {
        id: 8,
        name: 'Backpack Travel',
        price: 890000,
        category: 'Fashion',
        rating: 4.2,
        stock: 35,
        image: '🎒',
        description: 'Ba lô du lịch chống nước tiện dụng.',
    },
]

export const CATEGORIES = ['All', 'Electronics', 'Sports', 'Kitchen', 'Fashion']

export function getProductsAPI(search = '', category = 'All') {
    return new Promise((resolve) => {
        setTimeout(() => {
            let result = [...PRODUCTS]
            if (category !== 'All') {
                result = result.filter((p) => p.category === category)
            }
            if (search.trim()) {
                result = result.filter((p) =>
                    p.name.toLowerCase().includes(search.toLowerCase())
                )
            }
            resolve(result)
        }, 200)
    })
}
