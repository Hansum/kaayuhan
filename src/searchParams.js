import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropDown";
import Results from "./Results";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA"); //Location - current state of location while setLocation will be the updated location in the input. THIS IS A HOOK. Every time you see 'use', it is a hook
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [count, setCount] = useState(0);
  const [pets, setPets] = useState([]);

  /* 

  Async awaits lets a function or your logic to work until its done
  before going to the next arguments/logic.
  It will return a promise

  */

  async function requestPets() {
    /* async function guarantees that it will return a promise*/
    const { animals } = await pet.animals({
      /* await lets a function to complete  */
      location,
      breed,
      type: animal
    });

    setPets(
      animals || []
    ); /* It gets a set of animals if there are any from the api or an empty array if there is nothing from the api*/
  }

  /* 
  useEffect will wait and run, after the state finished rendering.

  In this example. useEffect runs when we choose or change another set of breeds
  */
  useEffect(() => {
    setBreeds(
      []
    ); /*Whenever I change the breeds type like from cats to dogs. I need to get a new set of breed specifically for dogs*/
    setBreed(""); /**/

    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    });
    document.title = `You clicked ${count} times`;
  }, [
    animal,
    setBreed,
    setBreeds
  ]); /* This are the effect dependencies in which if there are certain changes within the three dependencies, it will re run the useEffect after it renders otherwise it will not run*/

  return (
    <div className="search-params">
      <form
        onSubmit={e => {
          e.preventDefault(); /* prevent default cancels the event if it is cancelable*/
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={event => setLocation(event.target.value)} //onChange will trigger if there are changes inside the input and it will call setLocation and passed the value based inside the input
          ></input>
        </label>
        {/* <label htmlFor="animal">
          Animals
          <select
            id="animal"
            value={animal}
            onChange={event => setAnimal(event.target.value)}
            onBlur={event => setAnimal(event.target.value)}
          >
            <option>All</option>
            {ANIMALS.map(animal => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          breed
          <select
            id="breed"
            value={breed}
            onchange={event => setBreed(event.breed.value)}
            onBlur={event => setBreed(event.target.value)}
            disabled={breeds.length === 0}
          >
            <option>All</option>
            {breeds.map(breedevent => (
              <option key={breedevent} value={breedevent}>
                {breedevent}
              </option>
            ))}
          </select>
        </label> */}
        <AnimalDropdown />
        <BreedDropdown />
        <button>Submit</button>
      </form>
      <Results pets={pets} />
      {/* The Results component is the child component of searchparams where we pass {pets} data from the api to the Results parameter called 'pets' */}
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
    </div>
  );
};

export default SearchParams;
