import { faker } from '@faker-js/faker';

// Generate Summary Data
export const generateSummaryData = () => {
  const totalSales = faker.number.int({ min: 800, max: 2000 });
  const totalOrders = faker.number.int({ min: 50, max: 100 });
  const productsSold = faker.number.int({ min: 150, max: 300 });
  const newCustomers = faker.number.int({ min: 5, max: 15 });

  return [
    {
      title: "Total Sales",
      value: `$${(totalSales / 1000).toFixed(1)}k`,
      change: `${faker.number.float({ min: -5, max: 15, fractionDigits: 1 })}% from yesterday`,
      iconType: "BarChart2",
      bgColor: "bg-red"
    },
    {
      title: "Total Order",
      value: totalOrders.toString(),
      change: `${faker.number.float({ min: -3, max: 10, fractionDigits: 1 })}% from yesterday`,
      iconType: "ShoppingCart",
      bgColor: "bg-orange"
    },
    {
      title: "Product Sold",
      value: productsSold.toString(),
      change: `${faker.number.float({ min: -2, max: 5, fractionDigits: 1 })}% from yesterday`,
      iconType: "Package",
      bgColor: "bg-green"
    },
    {
      title: "New Customers",
      value: newCustomers.toString(),
      change: `${faker.number.float({ min: -1, max: 8, fractionDigits: 1 })}% from yesterday`,
      iconType: "TrendingUp",
      bgColor: "bg-purple"
    }
  ];
};

// Generate Visitor Insights Data
export const generateVisitorData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    name: month,
    loyal: faker.number.int({ min: 200, max: 450 }),
    new: faker.number.int({ min: 150, max: 350 }),
    unique: faker.number.int({ min: 200, max: 450 })
  }));
};

// Generate Revenue Data
export const generateRevenueData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => {
    const online = faker.number.int({ min: 1500, max: 5000 });
    const offline = faker.number.int({ min: 1000, max: 3500 });
    return {
      month,
      online,
      offline,
      total: online + offline
    };
  });
};

// Generate Customer Satisfaction Data
export const generateSatisfactionData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    month,
    lastMonth: faker.number.int({ min: 20, max: 90 }),
    thisMonth: faker.number.int({ min: 30, max: 110 })
  }));
};

// Generate Target vs Reality Data
export const generateTargetRealityData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    month,
    reality: faker.number.int({ min: 7000, max: 12000 }),
    target: faker.number.int({ min: 5000, max: 10000 })
  }));
};

// Generate Top Products Data
export const generateTopProductsData = () => {
  const products = Array.from({ length: 10 }, (_, i) => {
    const sales = faker.number.int({ min: 15, max: 50 });
    return {
      id: i + 1,
      name: faker.commerce.productName(),
      popularity: sales,
      sales
    };
  });

  products.sort((a, b) => b.sales - a.sales);

  return products.map((product, index) => ({
    ...product,
    id: index + 1
  }));
};

// Generate Sales by Country Data
export const generateSalesByCountry = () => {
  const countries = [
    { name: 'United States', coords: [37.0902, -95.7129] },
    { name: 'Brazil', coords: [-14.2350, -51.9253] },
    { name: 'Australia', coords: [-25.2744, 133.7751] },
    { name: 'India', coords: [20.5937, 78.9629] },
    { name: 'China', coords: [35.8617, 104.1954] },
    { name: 'United Kingdom', coords: [55.3781, -3.4360] },
    { name: 'Germany', coords: [51.1657, 10.4515] },
    { name: 'Japan', coords: [36.2048, 138.2529] },
    { name: 'Canada', coords: [56.1304, -106.3468] },
    { name: 'France', coords: [46.2276, 2.2137] },
    { name: 'South Africa', coords: [-30.5595, 22.9375] }
  ];

  return countries.map(country => {
    const sales = faker.number.int({ min: 3000, max: 30000 });
    return {
      country: country.name,
      sales,
      percentage: faker.number.int({ min: 2, max: 20 })
    };
  });
};

// Generate Volume vs Service Data
export const generateVolumeServiceData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    month,
    volume: faker.number.int({ min: 280, max: 520 }),
    service: faker.number.int({ min: 240, max: 480 })
  }));
};

// Generate all dashboard data at once
export const generateAllDashboardData = () => ({
  summary: generateSummaryData(),
  visitors: generateVisitorData(),
  revenue: generateRevenueData(),
  satisfaction: generateSatisfactionData(),
  targetReality: generateTargetRealityData(),
  topProducts: generateTopProductsData(),
  salesByCountry: generateSalesByCountry(),
  volumeService: generateVolumeServiceData()
});
