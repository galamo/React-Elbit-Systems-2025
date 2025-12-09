import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { HeaderApp } from "../../header-app";
import data from "./dummyData.json";
import css from "./countries.module.css";
import { CountryCard } from "./card";

import {
  getCountriesApi,
  getCountriesByNameApi,
} from "../../../services/countriesService";
import { useSettings } from "../../../context/hook";

export type SingleCountry = (typeof data)[0];

export function CountriesPage() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState<Array<SingleCountry>>([]);
  const [counter, setCounter] = useState<number>(0);
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  const { state } = useSettings();
  const [currentTime, setCurrentTime] = useState(new Date());

  function handleFilter(e: ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value);
  }

  // update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Basic date formatter
  const formatDate = (date: Date, format: string) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return format
      .replace("YYYY", String(year))
      .replace("MM", month)
      .replace("DD", day);
  };

  const formatTime = (date: Date) => {
    const dateStr = formatDate(date, state.dateFormat);
    const timeStr = date.toLocaleTimeString();

    if (state.timezone === "UTC") {
      const utcDate = new Date(date.toUTCString());
      const utcDateStr = formatDate(utcDate, state.dateFormat);
      return `${utcDateStr} ${utcDate.toUTCString().split(" ")[4]} UTC`;
    } else {
      return `${dateStr} ${timeStr}`;
    }
  };

  // ❌ NO DEBOUNCE — runs on every keystroke
  useEffect(() => {
    async function getCountries() {
      try {
        setIsLoadingCountries(true);

        const result = !filter
          ? await getCountriesApi()
          : await getCountriesByNameApi(filter);

        // ❌ No race condition handling — responses can overwrite each other
        console.log(
          `RESPONSE ARRIVED for filter="${filter}" (may be out of order)`
        );

        setCountries(result as Array<SingleCountry>);
      } catch (ex) {
        if (ex instanceof Error) console.log(ex.message);
      } finally {
        setIsLoadingCountries(false);
      }
    }

    getCountries();
  }, [filter]);

  return (
    <>
      <div>
        <div>
          <button
            onClick={() => {
              setCounter(counter + 1);
            }}
          >
            Counter=
          </button>

          <HeaderApp text={"Countries " + counter} />
        </div>

        <div
          style={{
            marginBottom: "10px",
            padding: "10px",
            background: "#f0f0f0",
            borderRadius: "5px",
          }}
        >
          <strong>Current Time ({state.timezone}):</strong>{" "}
          {formatTime(currentTime)}
        </div>

        {/* <-- no debounce */}
        <input type="text" onChange={handleFilter} />
      </div>

      {isLoadingCountries ? <h2>Loading...</h2> : null}

      <div className={css.cardsWrapper}>
        {countries.map((item) => {
          return (
            <CountryCard
              key={item.name.common}
              population={item.population}
              name={item.name.common}
              flag={item?.flags?.png}
              code={item.cca3}
            />
          );
        })}
      </div>
    </>
  );
}
