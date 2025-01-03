
exports.get = (req, res) => {
        const catalogue = [
			{
				"id": 1,
				"name": "Product 1",
				"description": "Product 1 description",
				"price": 100,
			},
			{
				"id": 2,
				"name": "Product 2",
				"description": "Product 2 description",
				"price": 200,
			},
			{
				"id": 3,
				"name": "Product 3",
				"description": "Product 3 description",
				"price": 300,
			},
			{
				"id": 4,
				"name": "Product 4",
				"description": "Product 4 description",
				"price": 400,
			}
		];
		
	
	res.setHeader('Content-Type', 'application/json');
      
    res.send(catalogue);
   };    

