import React from "react";
import Pet from "./Pet";

const Results = ({ pets }) => {
  return (
    <div className="searc">
      {pets.length === 0 ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map(pet => (
          /* 
            In this section, we pass the different pet objects to the Pet function in Pet.js.
            For example, we hold the pet type to animal parameter
            */
          <Pet
            animal={pet.type}
            key={pet.id}
            name={pet.name}
            breed={pet.breeds.primary}
            media={pet.photos}
            location={`${pet.contact.address.city}, ${pet.contact.address.state}`}
            id={pet.id}
          />
        ))
      )}
    </div>
  );
};

export default Results;
