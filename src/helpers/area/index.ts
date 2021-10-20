/* eslint-disable @typescript-eslint/no-non-null-assertion */
import areaCode, { IArea } from './area'

/**
 * 返回省 | 市 | 区的数据
 * @param key 'province' | 'city' | 'county'
 * @returns {{ [number]: string }}
 */
export const getAreaData = (key: 'province' | 'city' | 'county') => {
  if (!['province', 'city', 'county'].includes(key)) {
    throw new Error('[getAreaList]: 参数必须是"province", "city", "county"其中之一')
  }
  return areaCode[`${key}_list`]
}

/**
 * 返回所有地区数据
 * @returns {{ province_list: { [code: number]: string }; city_list: { [code: number]: string }; county_list: { [code: number]: string } }}
 */
export const getArea = () => {
  return areaCode
}

/**
 * 返回省份列表
 * @returns {{ code: number | string; name: string }[]}
 */
export const getProvinceList = () => {
  return Object.keys(getAreaData('province')).map((code) => {
    return {
      code,
      name: getAreaData('province')[code]
    }
  })
}

/**
 * 通过省code获取该省的城市列表
 * @param provinceCode string | number
 * @returns {{ code: number | string; name: string }[]}
 */
export const getCityListByProvince = (provinceCode: keyof IArea) => {
  const codeArr = Object.keys(getAreaData('city')).filter((code) => code.slice(0, 2) === `${provinceCode}`.slice(0, 2))
  return codeArr.map((code) => {
    return {
      code,
      name: getAreaData('city')[code]
    }
  })
}

/**
 * 通过城市code获取该市的区县列表
 * @param cityCode string | number
 * @returns {{ code: number | string; name: string }[]}
 */
export const getCountyListByCity = (cityCode: keyof IArea) => {
  const codeArr = Object.keys(getAreaData('county')).filter((code) => code.slice(0, 4) === `${cityCode}`.slice(0, 4))
  return codeArr.map((code) => {
    return {
      code,
      name: getAreaData('county')[code]
    }
  })
}

/**
 * 通过区县code获取该区县的完整信息
 * @param countyCode number | string
 * @returns {{ code: string | number; name: string }}
 */
export const getCountyByCode = (countyCode: keyof IArea) => {
  const name = getAreaData('county')[countyCode]
  return { name, code: countyCode }
}

/**
 * 通过县code获取该区县所在的城市信息
 * @param countyCode number | string
 * @returns {{ code: string | number; name: string }}
 */
export const getCityByCountyCode = (countyCode: keyof IArea) => {
  const code = Object.keys(getAreaData('city')).find((code) => code.slice(0, 4) === `${countyCode}`.slice(0, 4))!
  return { code, name: getAreaData('city')[code] }
}

/**
 * 通过城市code获取该城市所在的省份信息
 * @param cityCode number | string
 * @returns {{ code: string | number; name: string }}
 */
export const getProvinceByCityCode = (cityCode: keyof IArea) => {
  const code = Object.keys(getAreaData('province')).find((code) => code.slice(0, 2) === `${cityCode}`.slice(0, 2))!
  return { code, name: getAreaData('province')[code] }
}

export default {
  getArea,
  getAreaData,
  getProvinceList,
  getCityListByProvince,
  getCountyListByCity,
  getCountyByCode,
  getCityByCountyCode,
  getProvinceByCityCode
}
