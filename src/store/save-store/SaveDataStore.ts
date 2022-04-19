import { API_END_POINTS, API_IDS } from '../../common/ApiConfiguration'
import { BaseRequest } from '../../http-layer'

export class SaveDataStore {

  context: undefined
  constructor(storeContext){
    this.context = storeContext
  }


  saveAnEvent = async (params, urlParams, prefetch = true) => {
    const loginUser = new BaseRequest(this.context, {
      methodType: 'POST',
      apiEndPoint: API_END_POINTS.SAVE_ITEM,
      apiId: API_IDS.SAVE_ITEM,
      params,
      reqParams: urlParams,
      prefetch
    })
    await loginUser.setRequestHeaders()
    await loginUser.hitPostApi()
  }

}