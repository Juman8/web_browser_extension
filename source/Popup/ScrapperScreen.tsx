/* eslint-disable react/button-has-type */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import UserContext from './UserContext';
import './Scrapper.scss';
import {onApiLogout} from '../api/authApi';
import {browser} from 'webextension-polyfill-ts';
import {onApiScrapUrl} from '../api/scraperApi';
import {
  changeArrayMethodToStringMethod,
  formatExtractLinev2,
  getNumberFromString,
} from '../utils/common';
import {
  AddManyRecipeLineRequest,
  getToken,
  onCheckScrapperUrl,
  onCreateARecipe,
  setToken,
  UpdateRecipeRequestV2,
} from '../api/common';
import {configApi} from '../api/config';
import {ToastService} from '../component/ToastService';

export const ScrapperScreen = (): any => {
  const {setUserData} = React.useContext(UserContext);
  const [isErr, setErr] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const onLogout = (): void => {
    localStorage.removeItem('USER_INFO');
    setUserData('');
    setToken('');
    onApiLogout();
  };

  const onShowMessAndHide = (
    recipeName: string,
    idRecipe: string,
    prefix: 'saved!' | 'is already saved!'
  ): void => {
    const text = `${recipeName} ${prefix}`;
    const callback = (): void => {
      const url = `${configApi.domainWeb + idRecipe}?token=${getToken()}`;
      browser.tabs.create({
        url,
        active: true,
      });
    };
    ToastService.showToast(text, 'success', callback);
  };

  const onShowErrorScrapper = (): void => {
    ToastService.showToast('No recipes were found at this URL!', 'success');
  };

  const onSyncDataRecipe = async (
    dataScrapper: any,
    recipeSource: string
  ): Promise<void> => {
    const dataCheck = await onCheckScrapperUrl(recipeSource);
    if (dataCheck?.isAlready) {
      onShowMessAndHide(
        dataScrapper.name,
        dataCheck?.idRecipe,
        'is already saved!'
      );
      return;
    }
    const RecipeLineBody = formatExtractLinev2(dataScrapper.ingredients, 0);

    // Create recipe
    const dataNewRecipe = await onCreateARecipe();
    const idRecipe = dataNewRecipe?.data?.id;
    if (idRecipe) {
      // update recipe
      const body = {
        name: dataScrapper.name,
        description: dataScrapper.description,
        portions: getNumberFromString(dataScrapper.portions) || 1,
        method: changeArrayMethodToStringMethod(dataScrapper.method),
        urlImage: dataScrapper.image_source,
        recipeSource,
        isScrapper: true,
      };

      // update recipeline
      await AddManyRecipeLineRequest(idRecipe, {recipeLines: RecipeLineBody});
      // update info recipe
      await UpdateRecipeRequestV2(idRecipe, body);
      onShowMessAndHide(dataScrapper.name, idRecipe, 'saved!');
      setIsLoading(false);
    } else {
      setErr(true);
    }
  };

  React.useEffect(() => {
    if (isErr) {
      onShowErrorScrapper();
    }
  }, [isErr]);

  const onClickScraper = (): void => {
    setErr(false);
    setIsLoading(true);
    browser.tabs.query({currentWindow: true, active: true}).then((data) => {
      if (data) {
        const currentTabSelected = data.find(
          (el: any) => el.active && el.selected
        );
        if (currentTabSelected && currentTabSelected.url) {
          onApiScrapUrl(currentTabSelected.url)
            .then((dataNew) => {
              if (dataNew?.supported) {
                onSyncDataRecipe(dataNew, currentTabSelected.url || '');
                setErr(false);
              } else {
                setErr(true);
                setIsLoading(false);
              }
            })
            .catch(() => {
              setErr(true);
              setIsLoading(false);
            });
        } else {
          setIsLoading(false);
        }
      }
    });
  };

  React.useEffect(() => {
    onClickScraper();
  }, []);

  return (
    <div style={{}} id="scraper">
      <button
        className="bnLogout"
        onClick={() => {
          onLogout();
        }}
      >
        Logout
      </button>
      <div className="container">
        {/* {isErr && (
          <p style={{color: 'red'}}>Can not get any recipe in this url!</p>
        )} */}
        {isLoading && !isErr && (
          <p>Retrieving data and saving to MenuWise...</p>
        )}
        {isErr && (
          <button className="bnSync" onClick={onClickScraper}>
            Retry
          </button>
        )}
      </div>
    </div>
  );
};
