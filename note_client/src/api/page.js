import { Page } from '../model/page'
import { RestApi } from '../util/rest-api'
import { API_URL } from '../resource/urls'

export default new RestApi(API_URL.NotePage, Page)
