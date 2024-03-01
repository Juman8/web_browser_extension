import * as React from 'react';
import UserContext from './UserContext';
import './Scrapper.scss';
import {onApiLogout} from '../api/authApi';
import {browser} from 'webextension-polyfill-ts';
import {onApiScrapUrl} from '../api/scraperApi';
import {changeArrayMethodToStringMethod, formatExtractLinev2, getNumberFromString} from '../utils/common';
import {AddManyRecipeLineRequest, getToken, onCheckScrapperUrl, onCreateARecipe, setToken, UpdateRecipeRequestV2} from '../api/common';
import {configApi} from '../api/config';
export const ScrapperScreen = () => {
  const {setUserData} = React.useContext(UserContext);
  const [isErr, setErr] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const onLogout = () => {
    localStorage.removeItem('USER_INFO');
    setUserData('');
    setToken('');
    onApiLogout();
  };

  const onShowMessAndHide = (recipeName: string, idRecipe: string, prefix: 'saved!' | 'is already imported!') => {
    const text = `${recipeName} ` + prefix;
    if (confirm(text)) {
      const url = configApi.domainWeb + idRecipe + '?token=' + getToken();
      browser.tabs.create({
        url: url,
        active: true,
      });
    } else {
      browser.runtime.reload();
    }
  };

  const onSyncDataRecipe = async (dataScrapper: any, recipeSource: string) => {
    const dataCheck = await onCheckScrapperUrl(recipeSource);
    if (dataCheck?.isAlready) {
      onShowMessAndHide(dataScrapper.name, dataCheck?.idRecipe, 'is already imported!');
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
        isScrapper: true
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

  const onClickScapper = () => {
    setErr(false);
    setIsLoading(true);
    browser.tabs.query({currentWindow: true, active: true}).then(data => {
      if (data) {
        const currentTabSelected = data.find((el: any) => el.active && el.selected);
        if (currentTabSelected && currentTabSelected.url) {
          onApiScrapUrl(currentTabSelected.url).then(data => {
            if (data?.supported) {
              onSyncDataRecipe(data, currentTabSelected.url || '');
              setErr(false);
            } else {
              setErr(true);
              setIsLoading(false);
            }
          }).catch(() => {
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
    onClickScapper();
  }, []);

  return (
    <div style={{
    }} id="scapp">
      <button className='bnLogout' onClick={() => {
        onLogout();
      }}>
        Logout
      </button>
      <div className='container'>
        {isErr && <p style={{color: 'red'}}>Can not get any recipe in this url!</p>}
        {isLoading && !isErr && <p>Retrieving data and saving to MenuWise...</p>}
        {isErr && <button className='bnSync' onClick={onClickScapper}>
          Restry
        </button>
        }
      </div>
    </div>
  );
};