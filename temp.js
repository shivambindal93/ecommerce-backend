const fs = require("fs");
const https = require("https");
const axios = require("axios");
const data = [{"name":"Diet Coke 330ml","id":"54641f90-e6a0-49f9-8d32-eb526e914779","price":17.32,"category":"Drinks/Fizzy Drinks/12 - 24 Packs","inStock":true,"brand":"Coke"},
{"name":"Pepsi Max No Sugar Cola Can 24x330ml","id":"8586dfc3-a049-41a9-a6f9-9cbbdf9e185a","price":19.49,"category":"Drinks/Fizzy Drinks/12 - 24 Packs","inStock":true,"brand":"Pepsi"},
{"name":"Coca-Cola Original Taste 6 x 330ml","id":"79d0972c-1e77-43b0-9888-3ecfa9ec4733","price":6.56,"category":"Drinks/Fizzy Drinks/Multipacks","inStock":true,"brand":"Coke"},
{"name":"Coca-Cola Zero Sugar 330ml","id":"f1a6277a-db98-4c0e-9b7b-a750ab29f233","price":17.01,"category":"Drinks/Fizzy Drinks/12 - 24 Packs","inStock":true,"brand":"Coke"},
{"name":"Diet Coke 8 x 330ml","id":"2c834915-b748-4b1c-8917-b567ff4980ac","price":11.67,"category":"Drinks/Fizzy Drinks/Multipacks","inStock":true,"brand":"Coke"},
{"name":"Coca-Cola Zero Sugar 8 x 330ml","id":"80af8529-6a91-4d2f-b98b-36404cad789d","price":8.49,"category":"Drinks/Fizzy Drinks/Multipacks","inStock":true,"brand":"Coke"},
{"name":"Pure Smooth Orange Juice from Concentrate 1l","id":"4902ccdf-618f-465f-9d58-925873366763","price":2.35,"category":"Drinks/Fruit Juice & Smoothies","inStock":true},
{"name":"White Rock Still Spring Water 24 x 500ml","id":"5c7ca712-3b49-469d-b735-a2486791492d","price":7.12,"category":"Drinks/Kids & Lunchbox Drinks","inStock":true},
{"name":"Pure Apple Juice from Concentrate 1l","id":"3aaa817b-ae54-4146-a75d-c3166d951903","price":2.16,"category":"Drinks/Fruit Juice & Smoothies/Fruit Juice","inStock":true},
{"name":"Pepsi Max No Sugar Cola Bottle 3L","id":"ee27e780-e28a-433d-a6a4-85b96562f3f9","price":5.1,"category":"Drinks/Fizzy Drinks/Diet Drinks","inStock":true,"brand":"Pepsi","updatedPrice":3.53},
{"name":"Coca-Cola Original Taste 24x 330ml","id":"cbe20d81-056b-4ec0-b6f9-fe655b942858","price":23.75,"category":"Drinks/Fizzy Drinks/12 - 24 Packs","inStock":true,"brand":"Coke"},
{"name":"R.White's Lemonade 3L","id":"419ac4d2-ce95-4711-b060-11c7def5318e","price":2.86,"category":"Drinks/Fizzy Drinks/Lemonade","inStock":true,"brand":"R.White's"},
{"name":"Essence Strawberry Raspberry Flavoured Still Spring Water Drink 2 Litre","id":"348c95b3-20a6-4b12-b834-5d961dede357","price":1.54,"category":"Drinks/Still & Flavoured Water","inStock":true,"brand":"Trederwen"},
{"name":"Don Mario Chopped Tomatoes in Tomato Juice 400g","id":"dc1357cb-88cb-460b-b0b1-38c8482cfa82","price":1.24,"category":"Food Cupboard/Cans, Tins & Packets/Tinned Tomatoes & Vegetables","inStock":true,"brand":"Don Mario"},
{"name":"Crawford's Custard Creams Biscuits 300g","id":"ed78927b-d38e-48ef-b846-5cd6dfddbc5c","price":1.22,"category":"Food Cupboard/Biscuits & Beverages","inStock":true,"brand":"Crawford's"},
{"name":"Pot Noodle Chicken & Mushroom Standard 90 g","id":"d82ab927-275c-4d6d-bc9a-d4fa65114c3a","price":1.24,"category":"Food Cupboard/Cans, Tins & Packets/Packet Rice, Pasta & Noodles","inStock":true,"brand":"Pot Noodle"},
{"name":"Bens Original Basmati Microwave Rice 250g","id":"ad038287-f776-451a-bd9c-f614764bd1a6","price":2.9,"category":"Food Cupboard/Rice, Pasta & Noodles/Rice, Grains & Pulses","inStock":true,"brand":"Ben's Original"},
{"name":"Batchelors Super Noodles Chicken Flavour 90g","id":"d19da3a7-2250-4caa-9f8d-b842282c0e2c","price":1.65,"category":"Food Cupboard/Cans, Tins & Packets/Packet Rice, Pasta & Noodles","inStock":true,"brand":"Batchelors"},
{"name":"Whitworths Granulated Sugar 1kg","id":"88d405f5-877c-4318-bb83-d8538cb5f024","price":1.29,"category":"Food Cupboard/Home Baking","inStock":true,"brand":"Whitworths"},
{"name":"Pepsi Max No Sugar Cola Bottle 3L","id":"ab586d19-2cb6-48e6-ba80-4a9cd88659a9","price":5.34,"category":"Drinks/Fizzy Drinks/Diet Drinks","inStock":true,"brand":"Pepsi","updatedPrice":5.07},
{"name":"Walkers Quavers Cheese Multipack Snacks 12x16g","id":"5d9dce83-de3c-477d-a200-55662d6153c6","price":4.76,"category":"Food Cupboard/Crisps, Nuts & Snacks/Multipack Crisps","inStock":true,"brand":"Walkers"},
{"name":"Kit Kat 2 Finger Milk Chocolate Biscuit Bar Multipack 5+1 Free Pack","id":"83cf0648-c704-4ae8-bb4c-5f02d57d3279","price":1.86,"category":"Food Cupboard/Biscuits & Beverages","inStock":true,"brand":"Kit Kat"},
{"name":"Walkers Classic Variety Multipack Crisps 22x25g","id":"c6a39609-d79e-4cf4-9327-784ef6ca388b","price":10.35,"category":"Food Cupboard/Crisps, Nuts & Snacks/Multipack Crisps","inStock":true,"brand":"Walkers"},
{"name":"Branston Baked Beans in a Rich and Tasty Tomato Sauce 4 x 410g","id":"298e6450-0264-4837-a22a-b2cdae7aaeb3","price":3.8,"category":"Food Cupboard/Cans, Tins & Packets/Tinned Beans, Spaghetti & Pasta","inStock":true,"brand":"Branston"},
{"name":"Easy Peelers","id":"1659928e-3942-4622-9e66-5829fd82aa24","price":3.2,"category":"Fresh/Fresh Fruit, Veg & Salads/Fresh Fruit","inStock":true},
{"name":"Bananas 5 pack","id":"67877b40-02f3-4b06-be69-0538c8c8c4e3","price":2.25,"category":"Fresh/Fresh Fruit, Veg & Salads/Fresh Fruit","inStock":true},
{"name":"White Potatoes 3.5kg","id":"8c3cb381-0512-4e7e-8cf2-c8301bca6ee6","price":4.1,"category":"Fresh/Fresh Fruit, Veg & Salads/Potatoes","inStock":true,"updatedPrice":3.16},
{"name":"6 Gala Apples 6 Unit","id":"8fe8f540-0cdd-4793-be42-f73e95bdee89","price":3.9,"category":"Fresh/Fresh Fruit, Veg & Salads/Fresh Fruit","inStock":true},
{"name":"Mixed Seedless Grapes 400g","id":"d73627ec-10ff-4a12-a9b6-a5ed3d9a4b53","price":5.28,"category":"Fresh/Fresh Fruit, Veg & Salads/Fresh Fruit","inStock":true},
{"name":"Cathedral City Mature Cheddar 350g","id":"25259e1e-6930-4db2-8652-974842330d58","price":7.37,"category":"Fresh/Cheese/Cheddar Cheese","inStock":true,"brand":"Cathedral City"},
{"name":"Mr Kipling 8 French Fancies","id":"460bdcdf-7be8-4737-847d-e625b8773cbb","price":5.3,"category":"Bakery/Cakes/Muffins & Mini Bites","inStock":true,"brand":"Mr Kipling","updatedPrice":2.72},
{"name":"Prime Beef Roasting Joint 900g","id":"77ab232e-9b07-463c-9e7b-f8afdd51e3f9","price":26.36,"category":"Fresh/Fresh Meat & Chicken/Beef","inStock":true},
{"name":"Luxury Lean Cooked Wiltshire Ham 100g","id":"f1aeda32-8834-4b42-9d2c-a5eb6f2afc32","price":3.83,"category":"Fresh/Cooked Meats & Deli/Ham","inStock":true},
{"name":"10 Slices (approx.) Cooked Chicken 115g","id":"2a2cabf1-0b6c-4a36-85b9-b8d4ac00c86f","price":1.68,"category":"Fresh/Cooked Meats & Deli/Chicken & Turkey","inStock":true},
{"name":"4 Slices (approx.) Topside Beef 100g","id":"de183668-9d1b-4d72-8008-85c227a7d044","price":5.83,"category":"Fresh/Cooked Meats & Deli/Beef","inStock":true},
{"name":"Greggs 8 Sausage Rolls 854g","id":"c8362cb7-117a-47f8-bc6a-48f0d43ea680","price":7.95,"category":"Frozen/Frozen Pies/Greggs","inStock":true,"brand":"Greggs"},
{"name":"Thin and Crispy Double Pepperoni 334g","id":"a0864923-206a-4635-a2d0-02e8389b50f6","price":1.97,"category":"Frozen/Pizza & Garlic Bread/Thin & Crispy Pizza","inStock":true},
{"name":"Thin and Crispy French Fries 1.25kg","id":"bb1f47bb-d591-4d9c-a3fe-f10292cf0d19","price":2,"category":"Frozen/Chips & Potatoes/Chips & Fries","inStock":true},
{"name":"Chicken Breast Fillets 1.38kg","id":"77e5f52f-aa31-4bfe-9fe7-c256ed1e5e1e","price":12.23,"category":"Frozen/Frozen Meat & Chicken/Chicken","inStock":true},
{"name":"McCain Home Chips Straight 1.36kg","id":"218b5ccf-2484-449c-b56b-0b59591965f2","price":4.39,"category":"Frozen/Chips & Potatoes/Chips & Fries","inStock":true,"brand":"McCain"},
{"name":"Beef Lasagne 500g","id":"2a8900a2-bc8a-4ab5-bad4-4da0cadf1561","price":1.88,"category":"Frozen/Frozen Ready Meals/Italian","inStock":true},
{"name":"Thin and Crispy Cheese and Tomato 302g","id":"5b7c7c94-1217-46b8-9dcf-00f0ebc3de9d","price":2.49,"category":"Frozen/Pizza & Garlic Bread/Thin & Crispy Pizza","inStock":true},
{"name":"Breaded Chicken Breast Fillet Strips 600g","id":"dd632d5c-e833-4641-9018-052884dc400a","price":6.77,"category":"Frozen/Frozen Meat & Chicken/Breaded & Battered Chicken","inStock":true},
{"name":"Hash Browns 800g","id":"26dd4b3b-47cc-4dd6-a7b9-6287ca4eb6a3","price":1.83,"category":"Frozen/Chips & Potatoes/Potatoes","inStock":true},
{"name":"Butter Basted Chicken Breast Joint 525g","id":"48653827-1b09-4414-9df3-6bb33ee746f5","price":8.35,"category":"Frozen/Frozen Meat & Chicken/Chicken","inStock":true},
{"name":"Perfect Mashed Potato 908g","id":"b61cf49e-9758-4462-9289-199dc7e5d805","price":2.42,"category":"Frozen/Chips & Potatoes/Potatoes","inStock":true},
{"name":"Clean & Go Household Surface Wipes 80 Wipes","id":"94a45c81-8a21-478a-a22f-cbd74d1c8bb4","price":1.56,"category":"Household/Cleaning Products","inStock":true},
{"name":"Breeze Toilet Tissue Soft White 24 Roll","id":"d0017146-9074-4fdd-942d-381e62718370","price":9.94,"category":"Household/Toilet Roll, Kitchen Roll & Tissues","inStock":true,"brand":"Breeze"},
{"name":"Domestos Original Thick Bleach 750 ml","id":"e54a2d0c-3f12-4c21-aea4-774edb5ab60c","price":2.67,"category":"Household/Cleaning Products/Bathroom & Toilet","inStock":true,"brand":"Domestos"},
{"name":"Petal Soft Luxury 3 Ply Soft White Toilet Tissue 9 Rolls","id":"0007eb27-44b7-4275-ab06-19a250ac82df","price":8.23,"category":"Household/Toilet Roll, Kitchen Roll & Tissues","inStock":true,"brand":"Petal Soft"},
{"name":"TidyZ 30 X-tra Strong Tie Handles Refuse Sacks 50L","id":"07345636-c3bd-47ec-a4ac-3244d2b0eb36","price":6.52,"category":"Household/Kitchenware","inStock":true},
{"name":"Velvet Classic Quilted 24 Toilet Rolls","id":"f26b62f1-d834-4d3a-8781-1dcb25673dac","price":20.26,"category":"Household/Toilet Roll, Kitchen Roll & Tissues","inStock":true,"brand":"Velvet"},
{"name":"Fairy Clean & Fresh Washing Up Liquid Pomegranate & Honeysuckle 520 ml","id":"2fa5d663-451f-431b-b451-213dac3efa58","price":1.75,"category":"Household/Cleaning Products/Washing Up & Dishwasher Tablets","inStock":true,"brand":"Fairy"},
{"name":"Maxi 3 Kitchen Roll","id":"5fea82d0-421a-4ff3-8fc2-59b5defa90cd","price":5.08,"category":"Household/Toilet Roll, Kitchen Roll & Tissues","inStock":true},
{"name":"FELIX Mixed Selection In Jelly Wet Cat Food 40 x 100g","id":"6bd412ba-84f4-45ae-8151-23eeff512095","price":22.48,"category":"Household/Pet Food","inStock":true,"brand":"Felix"},
{"name":"Domestos White & Sparkle Thick Bleach 750 ml","id":"f5942c8c-7580-4ae0-988a-e955e3a6361e","price":2.63,"category":"Household/Cleaning Products/Multipurpose","inStock":true,"brand":"Domestos"},
{"name":"Galpharm Paracetamol 500mg Tablets 16 Tablets","id":"f07e2dc6-a76c-469b-a07b-b31a938b10ee","price":0.99,"category":"Household/Medicines","inStock":true,"brand":"Galpharm"},
{"name":"Happy Monkey Milkshakes Chocolate 200ml","id":"9a0d73eb-5bb5-4a2a-b007-14386a3bd2ef","price":1.86,"category":"Fresh/Milk, Butter & Eggs/Milk","inStock":true,"brand":"Happy Monkey"},
{"name":"Sandwich Filler Egg Mayonnaise 200g","id":"aa65790a-18e2-499f-95ab-ef8cb0fc7045","price":1.84,"category":"Fresh/Cooked Meats & Deli/Sandwich Fillers","inStock":true},
{"name":"Ready To Eat Chicken Chunks 180g","id":"338a992e-1743-48ce-99a4-f948db044dd2","price":4.94,"category":"Fresh/Cooked Meats & Deli/Chicken & Turkey","inStock":true},
{"name":"Bird's Trifle Kit Chocolate Flavour 122g","id":"5eeee619-ba7f-43c9-95dd-fba2e23b4f70","price":2.1,"category":"Food Cupboard/Home Baking","inStock":true},
{"name":"Sandwich Filler Tuna & Sweetcorn 200g","id":"778d6e34-93ab-4b0b-9b7f-f9a1e9ce3221","price":2.69,"category":"Fresh/Cooked Meats & Deli/Sandwich Fillers","inStock":true},
{"name":"Golden Wonder Ringos Salt & Vinegar 6 x 12.5g (75g)","id":"e0164080-0e81-4b9f-a089-3273dfbdfab2","price":2.31,"category":"Food Cupboard/Crisps, Nuts & Snacks/Multipack Crisps","inStock":true,"brand":"Golden Wonder"},
{"name":"Walkers Wotsits Really Cheesy Multipack Snacks 12x16.5g","id":"5b21471a-a1f3-44de-b6f3-b301d59d5cc3","price":5.34,"category":"Food Cupboard/Crisps, Nuts & Snacks/Multipack Crisps","inStock":true,"brand":"Walkers"},
{"name":"Walkers French Fries Variety Multipack Snacks 12x18g","id":"b908b80a-4080-47dd-a7e4-b54520dc9da5","price":6.29,"category":"Food Cupboard/Crisps, Nuts & Snacks/Multipack Crisps","inStock":true,"brand":"Walkers"},
{"name":"Maynards Bassetts Jelly Babies Sweets Bag 165g","id":"8be84e0a-fbb8-4323-bff5-d6ad8e52571e","price":1.75,"category":"Food Cupboard/Chocolate & Sweets/Sweets","inStock":true,"brand":"Maynards Bassetts"},
{"name":"Crucials Sweet Chilli Thai Style Sauce, Dip, Marinade 500ml","id":"e5692332-49a7-47bb-9156-23c9ba614570","price":2.38,"category":"Food Cupboard/Table Sauces, BBQ & Pickles/BBQ, Chilli & Marinades","inStock":true,"brand":"Crucials"},
{"name":"Weetabix Crispy Minis Chocolate Chip Cereal 600g","id":"64537bb6-0dd2-4b4d-8297-025db7be8312","price":4.88,"category":"Food Cupboard/Cereal/Kids Cereal","inStock":true,"brand":"Weetabix"},
{"name":"Skips Prawn Cocktail Multipack Crisps 6 Pack","id":"e32da5f9-16f5-4053-aebd-030df5324a4f","price":2.88,"category":"Food Cupboard/Crisps, Nuts & Snacks/Multipack Crisps","inStock":true,"brand":"Skips"},
{"name": "Crispy Chicken Breast Dippers 990g","id":"bb333b82-aa53-4de0-a1ef-bb4fd75655d7","price": 5,"category": "Frozen/Frozen Meat & Chicken/Chicken","inStock": true}]

data.forEach((item, index)=>{
    var config = {
        method: "POST",
        maxBodyLength: Infinity,
        url: "https://34.118.243.85:9200/products/_doc/",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic ZWxhc3RpYzppZ0tyRy12RHIxbVRKektGXzdWbQ=="
        },
        data: item,
        httpsAgent: new https.Agent({
          cert: fs.readFileSync("http_ca.crt"),
          rejectUnauthorized: false
        })
      };
      
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data), "################### index ", index);
        })
        .catch(function (error) {
          console.log(error);
        });
})


