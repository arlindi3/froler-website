import React, { Component } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";
import carsData from "./data";

const CarContext = React.createContext();

class CarProvider extends Component {
  state = {
    cars: [],
    sortedCars: [],
    featuredCars: [],
    loading: true,
    //controlled input - cars filter component
    type: "all",
    carMake: "all",
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    gps: false,
    sportPackage: false,
  };

  // Unsubscribe function for Firestore listener
  unsubscribe = null;

  componentDidMount() {
    // Try to load from Firebase Firestore first
    try {
      const q = query(collection(db, "cars"), orderBy("createdAt", "desc"));
      this.unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            // Cars found in Firestore – use Firebase data
            const cars = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              // Ensure images is always an array
              images: Array.isArray(doc.data().images) ? doc.data().images : [],
              // Ensure extras is always an array
              extras: Array.isArray(doc.data().extras) ? doc.data().extras : [],
            }));
            this.applyCarState(cars);
          } else {
            // Firestore is empty – fall back to local static data
            this.loadStaticData();
          }
        },
        (error) => {
          // Firestore not set up yet – fall back to static data silently
          this.loadStaticData();
        },
      );
    } catch (error) {
      // Firebase config missing – fall back to static data
      console.warn("Firebase error, using static data:", error.message);
      this.loadStaticData();
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  loadStaticData = () => {
    const cars = this.formatData(carsData);
    this.applyCarState(cars);
  };

  applyCarState = (cars) => {
    const featuredCars = cars.filter((car) => car.featured === true);
    const maxPrice = Math.max(
      ...cars.map((car) => (typeof car.price === "number" ? car.price : 0)),
    );
    const maxSize = Math.max(
      ...cars.map((car) => (typeof car.size === "number" ? car.size : 0)),
    );

    this.setState(
      {
        cars,
        featuredCars,
        sortedCars: cars,
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize,
      },
      this.filterCars,
    );
  };

  // Flatten legacy local data.js structure
  formatData = (items) => {
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);
      let car = { ...item.fields, images, id };
      return car;
    });
    return tempItems;
  };

  // getCar function to set up slug parameter via--react router
  getCar = (slug) => {
    let tempCars = [...this.state.cars];
    const car = tempCars.find((tempCar) => tempCar.slug === slug);
    return car;
  };

  //form inputs - controlled input
  handleChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = e.target.name;

    this.setState(
      {
        [name]: value,
      },
      this.filterCars,
    );

    // console.log(`type: ${type}, name: ${name}, value: ${value}`)
  };

  filterCars = () => {
    let { cars, price, type, carMake, minSize, maxSize, gps, sportPackage } =
      this.state;
    //All cars
    let tempCars = [...cars];

    // -----------------------------------------------

    // filter by type
    if (type !== "all") {
      tempCars = tempCars.filter((car) => car.type === type);
    }

    // ---------------------------------------------------------

    //Filter by manufacturers
    if (carMake !== "all") {
      tempCars = tempCars.filter((car) => car.carMake === carMake);
    }

    // ---------------------------------------------------------
    //Filter by price
    tempCars = tempCars.filter((car) =>
      typeof car.price === "number" ? car.price <= price : true,
    );

    // ---------------------------------------------------------

    // Filter by size
    tempCars = tempCars.filter(
      (car) => car.size >= minSize && car.size <= maxSize,
    );

    // ---------------------------------------------------------

    if (gps) {
      tempCars = tempCars.filter((car) => car.gps === true);
    }

    if (sportPackage) {
      tempCars = tempCars.filter((car) => car.sportPackage === true);
    }

    //alternate state
    this.setState({
      sortedCars: tempCars,
    });
  };

  render() {
    return (
      <CarContext.Provider
        value={{
          ...this.state,
          getCar: this.getCar,
          handleChange: this.handleChange,
        }}
      >
        {this.props.children}
      </CarContext.Provider>
    );
  }
}

const CarConsumer = CarContext.Consumer;

//Higher order function that wraps component passed into in(carsContainer)
export function withCarConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <CarConsumer>
        {(value) => <Component {...props} context={value} />}
      </CarConsumer>
    );
  };
}

export { CarProvider, CarConsumer, CarContext };
