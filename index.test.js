const request = require("supertest");
const app = require("./src/app.js");
// const Restaurant = require("./models");

describe("Testing resaurant routes", () =>{

    it("GET /restaurants succeeds", async () =>{
        const response = (await request(app).get("/restaurants")).status;
        expect(response).toBe(200);
    });

    it("GET /restaurants returns array", async () => {
        const response = await request(app).get("/restaurants");
        const responseData = JSON.parse(response.text);
        
        expect(responseData.length).toBe(3);

        expect(responseData[0].id).toBe(1);
        expect(responseData[1].id).toBe(2);
        expect(responseData[2].id).toBe(3);

        expect(responseData[0].name).toBe("AppleBees");
        expect(responseData[1].name).toBe("LittleSheep");
        expect(responseData[2].name).toBe("Spice Grill");

        expect(responseData[0].location).toBe("Texas");
        expect(responseData[1].location).toBe("Dallas");
        expect(responseData[2].location).toBe("Houston");

        expect(responseData[0].cuisine).toBe("FastFood");
        expect(responseData[1].cuisine).toBe("Hotpot");
        expect(responseData[2].cuisine).toBe("Indian");

    });

    it("GET /restaurants/:id returns restaurant", async () => {
        const response = await request(app).get("/restaurants/2");
        const responseData = JSON.parse(response.text);
                
        expect(responseData.id).toBe(2);

        expect(responseData.name).toBe("LittleSheep");

        expect(responseData.location).toBe("Dallas");

        expect(responseData.cuisine).toBe("Hotpot");

    });

    it("POST /restaurants adds a new restaurant", async () => {
        await request(app).post("/restaurants").send({ name: "Arby", location: "test", cuisine: "crap" });
        const response = await request(app).get("/restaurants");
        const responseData = JSON.parse(response.text);
        console.log(JSON.stringify(responseData, null, 2));

        expect(responseData[3].id).toBe(4);
        expect(responseData[3].name).toBe("Arby");
        expect(responseData[3].location).toBe("test");
        expect(responseData[3].cuisine).toBe("crap");

    });

    it("PUT /restaurants updates restaurant", async () => {
        await request(app).put("/restaurants/4").send({ name: "Jack in box" });
        const response = await request(app).get("/restaurants/4");
        const responseData = JSON.parse(response.text);
        
        expect(responseData.name).toBe("Jack in box");
    });

    it("DELETE /restaurants/:id works", async () => {
        await request(app).delete("/restaurants/4");
        const response = await request(app).get("/restaurants");
        const responseData = JSON.parse(response.text);
        
        expect(responseData[3]).toBeNull;
    })
});

