const neptun = "dc4xja";
const serverApiUrl = `https://iit-playground.arondev.hu/api/${neptun}/car`;
let tempTaxi;

loadSideBar();

function loadSideBar() {
    fetch('sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar-container').innerHTML = data;
        });
}

function validateCarData(carData) {
    let allValid = true;
    if (!Number.isInteger(Number(carData.id)) || !carData.id) {
        document.querySelector("#errId").innerHTML = "ID must be an integer.";
        allValid = false;
    }

     const validBrands = [
        "Toyota", "Honda", "Ford", "Chevrolet", "Nissan",
        "BMW", "Mercedes-Benz", "Volkswagen", "Audi", "Hyundai",
        "Kia", "Subaru", "Lexus", "Mazda", "Tesla",
        "Jeep", "Porsche", "Volvo", "Jaguar", "Land Rover",
        "Mitsubishi", "Ferrari", "Lamborghini"
    ];
    if (!validBrands.includes(carData.brand)) {
        document.querySelector("#errBrand").innerHTML = "Please select a brand.";
        allValid = false;
    }

    if (typeof carData.model !== "string" || carData.model.trim() === "") {
        document.querySelector("#errModel").innerHTML = "Model is mandatory.";
        allValid = false;
    }

    if (!carData.electric) {
        document.querySelector("#errElectric").innerHTML = "Choose if the car is electric or not.";
        allValid = false;
    }

    if (carData.electric == "Yes") {
        if (carData.fuelUse != 0) {
            document.querySelector("#errFuelUse").innerHTML = "Fuel use must be 0 for electric vehicles.";
            allValid = false;
        }
    } else {
        if (Number(carData.fuelUse) <= 0 || isNaN(Number(carData.fuelUse))) {
            document.querySelector("#errFuelUse").innerHTML = "Fuel use must be greater than 0 for non-electric vehicles.";
            allValid = false;
        }
    }

    if (typeof carData.owner !== "string" || !carData.owner.includes(" ")) {
        document.querySelector("#errOwner").innerHTML = "Owner must contain at least one space (first and last name).";
        allValid = false;
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(carData.dayOfCommission)) {
        document.querySelector("#errDayOfComission").innerHTML = "Day of commission must be in YYYY-MM-DD format.";
        allValid = false;
    } else {
        const date = new Date(carData.dayOfCommission);
        if (isNaN(date.getTime())) {
            document.querySelector("#errDayOfComission").innerHTML = "Day of commission must be a valid date.";
            allValid = false;
        }
    }
    return allValid;
}
