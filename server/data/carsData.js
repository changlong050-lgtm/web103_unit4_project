const optionsData = [
// EXTERIORS (10)
{ category: 'exterior', name: 'Hypersonic Gray', price: 500 },
{ category: 'exterior', name: 'Accelerate Yellow', price: 500 },
{ category: 'exterior', name: 'Torch Red', price: 500 },
{ category: 'exterior', name: 'Arctic White', price: 0 },
{ category: 'exterior', name: 'Sebring Orange', price: 800 },
{ category: 'exterior', name: 'Rapid Blue', price: 800 },
{ category: 'exterior', name: 'Shadow Gray', price: 500 },
{ category: 'exterior', name: 'Blaze Orange', price: 1000 },
{ category: 'exterior', name: 'Elkhart Lake Blue', price: 1000 },
{ category: 'exterior', name: 'Carbon Flash Black', price: 1200 },

// ROOFS (5) — 3 coupe, 2 convertible
{ category: 'roof', name: 'Body Color', price: 0 },
{ category: 'roof', name: 'Carbon Fiber', price: 2500 },
{ category: 'roof', name: 'Gloss Black', price: 1500 },
{ category: 'roof', name: 'Dual Roof', price: 3000 },       // convertible only
{ category: 'roof', name: 'Transparent Roof', price: 2000 }, // convertible only

// WHEELS (10)
{ category: 'wheels', name: 'Bronze Forged', price: 1200 },
{ category: 'wheels', name: 'Carbon Flash', price: 1500 },
{ category: 'wheels', name: 'Silver Machined', price: 800 },
{ category: 'wheels', name: 'Blade Silver', price: 900 },
{ category: 'wheels', name: 'Black Painted', price: 700 },
{ category: 'wheels', name: 'Satin Graphite', price: 1000 },
{ category: 'wheels', name: 'Gold Forged', price: 2000 },
{ category: 'wheels', name: 'Gloss Black Machined', price: 1100 },
{ category: 'wheels', name: 'Polished Silver', price: 1300 },
{ category: 'wheels', name: 'Matte Black', price: 950 },

// INTERIORS (15)
{ category: 'interior', name: 'Adrenaline Red', price: 1500 },
{ category: 'interior', name: 'Sky Cool Gray', price: 1200 },
{ category: 'interior', name: 'Jet Black', price: 0 },
{ category: 'interior', name: 'Natural', price: 1800 },
{ category: 'interior', name: 'Morello Red', price: 1500 },
{ category: 'interior', name: 'GT2 Two-Tone', price: 2500 },
{ category: 'interior', name: 'Ceramic White', price: 2000 },
{ category: 'interior', name: 'Tension Blue', price: 1800 },
{ category: 'interior', name: 'Twilight Blue', price: 1600 },
{ category: 'interior', name: 'Brownstone', price: 1400 },
{ category: 'interior', name: 'Zeus Bronze', price: 2200 },
{ category: 'interior', name: 'Artemis', price: 2800 },
{ category: 'interior', name: 'Carbon Fiber Trim', price: 3000 },
{ category: 'interior', name: 'Kalahari', price: 1900 },
{ category: 'interior', name: 'Edge Red', price: 1700 },
];

const carsData = [
// assuming option IDs 1-40 in the order above
// exterior: 1-10, roof: 11-15, wheels: 16-25, interior: 26-40

{ name: 'Thunderbolt',  convertible: false, exterior_id: 1,  roof_id: 11, wheels_id: 16, interior_id: 26, total_price: 68200 },
{ name: 'Shadow',       convertible: false, exterior_id: 10, roof_id: 13, wheels_id: 22, interior_id: 31, total_price: 71700 },
{ name: 'Sunburst',     convertible: true,  exterior_id: 2,  roof_id: 14, wheels_id: 17, interior_id: 27, total_price: 71700 },
{ name: 'Ghost',        convertible: false, exterior_id: 4,  roof_id: 12, wheels_id: 21, interior_id: 29, total_price: 70300 },
{ name: 'Inferno',      convertible: false, exterior_id: 3,  roof_id: 11, wheels_id: 20, interior_id: 30, total_price: 68000 },
{ name: 'Arctic Fox',   convertible: true,  exterior_id: 4,  roof_id: 15, wheels_id: 25, interior_id: 33, total_price: 73950 },
{ name: 'Cobalt',       convertible: false, exterior_id: 9,  roof_id: 12, wheels_id: 18, interior_id: 34, total_price: 72100 },
{ name: 'Mirage',       convertible: true,  exterior_id: 6,  roof_id: 14, wheels_id: 23, interior_id: 36, total_price: 74600 },
{ name: 'Blaze',        convertible: false, exterior_id: 5,  roof_id: 13, wheels_id: 19, interior_id: 28, total_price: 70800 },
{ name: 'Venom',        convertible: false, exterior_id: 8,  roof_id: 11, wheels_id: 24, interior_id: 37, total_price: 72200 },
];

export {optionsData, carsData};