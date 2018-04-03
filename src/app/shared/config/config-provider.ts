/** 
 * ConfigProvider
 * defines which properties a class should implenment when called
 * To make a property options, add the '?' <property_name>?: <data_type>
 */
export interface ConfigProvider {
  apidomain: string;
  apikey: string;
  userid?: string;
  password?: string;
}