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

});