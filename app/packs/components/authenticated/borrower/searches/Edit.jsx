import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import map from "lodash/map";
import find from "lodash/find";

import PageBody from "../../general/PageBody";
import withGlobalProviders from "../../../general/withGlobalProvider";
import SearchForm from "./forms/SearchForm";
import { fetchSearch } from "../../../../actions/searchActions";
import {
  directLenderMortgageBrokerOptions,
  locationRangeOptions,
  retailWholesaleOptions,
  foreignNationalsConsideredOptions,
} from "./forms/helpers";

function Edit({ searchId }) {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.searches.items[searchId]);

  useEffect(() => {
    if (!search) {
      dispatch(fetchSearch(searchId));
    }
  }, [dispatch]);

  if (!search) return null;

  const providedValues = search.attributes;

  function toSelectOption(item) {
    return { value: item, label: item };
  }

  function toSelectOptions(items) {
    return map(items, toSelectOption);
  }

  function tranformKeyToOption(key, data) {
    data[key] = toSelectOptions(data[key])
  }

  providedValues.loanAmountRequested = search.attributes.loanAmountRequestedCents / 100.0

  map(
    [
      "propertyTypeFinanced",
      "typeOfInstitution",
      "typeOfFinancing",
      "recourse",
    ],
    (key) => {
      tranformKeyToOption(key, providedValues);
    }
  );

  providedValues.locationState = toSelectOption(providedValues.locationState);
  providedValues.locationPostalCode = providedValues.postalCode
  providedValues.locationRange = find(locationRangeOptions, { value: providedValues.locationRange })
  providedValues.directLenderMortgageBroker = find(
    directLenderMortgageBrokerOptions,
    { value: providedValues.directLenderMortgageBroker }
  );

  providedValues.retailWholesale = find(
    retailWholesaleOptions,
    { value: providedValues.retailWholesale }
  );

  providedValues.foreignNationalsConsidered = find(foreignNationalsConsideredOptions, {
    value: providedValues.foreignNationalsConsidered ? "Yes" : "No",
  });

  return (
    <PageBody>
      <div className="py-10 bg-gray-100 flagged">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900 text-shadow-sm">
              Find Lenders
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <main>
              {/* Page header */}
              <div className="mt-8 ">
                <SearchForm {...{ providedValues }} />
              </div>
            </main>
          </div>
        </main>
      </div>
    </PageBody>
  );
}

export default withGlobalProviders(Edit);
