import { Page } from '../model/page'
import { RestApi } from '../util/rest-api'
import { API_URL } from '../resource/urls'

const pageApi = new RestApi(API_URL.NotePage, Page)

export default {
  pageApi
}
