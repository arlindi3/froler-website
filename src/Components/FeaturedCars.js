import React, { Component } from "react";
import { CarContext } from "../context";
import Loading from "./Loading";
import Car from "./Car";
import Title from "./Title";

export default class FeaturedCars extends Component {
  static contextType = CarContext;

  render() {
    let { loading, cars } = this.context;

    // Show first 12 cars instead of just featured ones
    const displayCars = cars.slice(0, 12).map((car) => {
      return <Car key={car.id} car={car} />;
    });

    return (
      <section className="featured-cars">
        <Title title="Makinat e veçanta" />
        <div className="featured-cars-center">
          {loading ? <Loading /> : displayCars}
        </div>
      </section>
    );
  }
}
