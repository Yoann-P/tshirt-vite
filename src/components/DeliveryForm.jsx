import React from "react";

import { useSnapshot } from "valtio";
import { formState } from "../store";
import Inputfield from "./Inputfield";

export default function DeliveryForm() {
  const snap = useSnapshot(formState);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    formState.data[name] = type === "checkbox" ? checked : value;
  };

  const handleValidation = () => {
    const { data } = formState;
    const newErrors = {};

    if (!data.firstName || !data.lastName) {
      newErrors.name = "Veuillez entrer le prénom et le nom.";
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(data.email)) {
      newErrors.email = "Veuillez entrer une adresse e-mail valide.";
    }

    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(data.phoneNumber)) {
      newErrors.phoneNumber = "Veuillez entrer un numéro de téléphone valide.";
    }

    if (!data.deliveryAdress || !data.deliveryPostalCode) {
      newErrors.deliveryAdress = "Veuillez compléter l'adresse de livraison.";
    }

    if (!data.sameAsBilling) {
      if (!data.facturationAdress || !data.facturationName) {
        newErrors.facturationAddress =
          "Veuillez compléter l'adresse de facturation et le nom.";
      }
    }

    formState.errors = newErrors;

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = handleValidation();
    if (isValid) {
      console.log("Données du formulaire soumises :", snap.data);
    } else {
      console.log("Le formulaire contient des erreurs.");
    }
  };

  return (
    <form className="delivery-form" onSubmit={handleSubmit}>
      <h1>Formulaire de Livraison</h1>
      <div className="form-group">
        <Inputfield
          type="text"
          name="firstName"
          placeholder="Prénom"
          value={snap.data.firstName}
          onChange={handleChange}
        />
        <Inputfield
          type="text"
          name="lastName"
          placeholder="Nom"
          value={snap.data.lastName}
          onChange={handleChange}
        />
      </div>
      {snap.errors.name && <p className="error-message">{snap.errors.name}</p>}
      <div className="form-group">
        <Inputfield
          type="email"
          name="email"
          placeholder="adresse@mail.com"
          value={snap.data.email}
          onChange={handleChange}
        />
      </div>
      {snap.errors.email && (
        <p className="error-message">{snap.errors.email} </p>
      )}
      <div className="form-group">
        <Inputfield
          type="text"
          name="phoneNumber"
          placeholder="n° de téléphone"
          value={snap.data.phoneNumber}
          onChange={handleChange}
        />
      </div>
      {snap.errors.phoneNumber && (
        <p className="error-message">{snap.errors.phoneNumber}</p>
      )}
      <div className="form-group">
        <Inputfield
          type="text"
          name="deliveryAdress"
          placeholder="Adresse de livraison"
          value={snap.data.deliveryAdress}
          onChange={handleChange}
        />
        <Inputfield
          type="text"
          name="city"
          placeholder="Pays"
          value={snap.data.city}
          onChange={handleChange}
        />
        <Inputfield
          type="text"
          name="deliveryPostalCode"
          placeholder="Code Postal"
          value={snap.data.deliveryPostalCode}
          onChange={handleChange}
        />
      </div>
      {snap.errors.deliveryAdress && (
        <p className="error-message">{snap.errors.deliveryAdress}</p>
      )}
      <div className="form-group">
        <input
          type="checkbox"
          name="sameAsBilling"
          checked={snap.data.sameAsBilling}
          onChange={handleChange}
        />
        <label>Adresse de livraison identique à l'adresse de facturation</label>
      </div>
      {!snap.data.sameAsBilling && (
        <div className="form-group">
          <Inputfield
            type="text"
            name="facturationAdress"
            placeholder="Adresse de facturation"
            value={snap.data.facturationAdress}
            onChange={handleChange}
            required
          />
          <Inputfield
            type="text"
            name="facturationName"
            placeholder="Nom de facturation"
            value={snap.data.facturationName}
            onChange={handleChange}
            required
          />
        </div>
      )}

      {snap.errors.facturationAddress && (
        <p className="error-message">{snap.errors.facturationAddress}</p>
      )}

      <div className="form-group">
        <label>Option de livraison :</label>
        <select
          name="deliveryOption"
          value={snap.data.deliveryOption}
          onChange={handleChange}
        >
          <option value="standard">Standard</option>
          <option value="chronopost">Chronopost</option>
        </select>
      </div>

      <button type="submit">Soumettre</button>
    </form>
  );
}
