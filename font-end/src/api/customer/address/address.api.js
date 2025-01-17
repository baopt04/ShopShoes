import { request, requestAdress } from "../../../helper/request";
export class AddressApi {
  static fetchAll = (filter) => {
    return request({
      method: "GET",
      url: `/admin/address?id_user=2dd6dc5e-ad8d-473b-a2aa-23f3477a6394`,
      params: filter,
    });
  };

  static create = (data) => {
    return request({
      method: "POST",
      url: `/admin/address`,
      data: data,
    });
  };

  static getOne = (id) => {
    return request({
      method: "GET",
      url: `/admin/address/${id}`,
    });
  };

  static getAddressByUserIdAndStatus = (id) => {
    return request({
      method: "GET",
      url: `/admin/address/address-user-status/${id}`,
    });
  };

  static getAddressByUserIdAndStatusRoleEmployee = (id) => {
    return request({
      method: "GET",
      url: `/admin/address/address-user-status/${id}`,
    });
  };

  static update = (id, data) => {
    return request({
      method: "PUT",
      url: `/admin/address/${id}`,
      data: data,
    });
  };
  static fetchAllProvince = () => {
    return requestAdress({
      method: "GET",
      headers: {
        token: "d73043b1-2777-11ee-b394-8ac29577e80e",
      },
      url: `https://online-gateway.ghn.vn/shiip/public-api/master-data/province`,
    });
  };
  static fetchAllProvinceDistricts = (codeProvince) => {
    return requestAdress({
      method: "GET",
      headers: {
        token: "d73043b1-2777-11ee-b394-8ac29577e80e",
      },
      url: `  https://online-gateway.ghn.vn/shiip/public-api/master-data/district`,
      params: { province_id: codeProvince },
    });
  };
  static fetchAllProvinceWard = (codeDistrict) => {
    return requestAdress({
      method: "GET",
      headers: {
        token: "d73043b1-2777-11ee-b394-8ac29577e80e",
      },
      url: ` https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`,
      params: { district_id: codeDistrict },
    });
  };

  static fetchAllMoneyShip = (to_district_id, to_ward_code, quantity) => {
    let quantityProducts = 0;
    if (quantity == "" || quantity == null || quantity == undefined) {
      quantityProducts = 1;
    } else {
      quantityProducts = quantity;
    }

    return requestAdress({
      method: "GET",
      headers: {
        token: "d73043b1-2777-11ee-b394-8ac29577e80e",
        shop_id: "4374133",
      },
      url: ` https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`,
      params: {
        service_type_id: 2,
        insurance_value: "",
        coupon: "",
        from_district_id: 1485,
        to_district_id: to_district_id,
        to_ward_code: to_ward_code,
        height: 11 * quantityProducts,
        length: 28,
        weight: 300 * quantityProducts,
        width: 16,
      },
    });
  };
  static fetchAllDayShip = (to_district_id, to_ward_code) => {
    return requestAdress({
      method: "GET",
      headers: {
        token: "d73043b1-2777-11ee-b394-8ac29577e80e",
        shop_id: "4374133",
      },
      url: `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime`,
      params: {
        from_district_id: 1485,
        from_ward_code: "1A0607",
        to_district_id: to_district_id,
        to_ward_code: to_ward_code,
        service_id: 53320,
      },
    });
  };
  static fetchAllAddressByUser = (idUser) => {
    return request({
      method: "GET",
      url: `/admin/address/address-user/${idUser}`,
    });
  };

  static fetchAllAddressByUserRoleEmployee = (idUser) => {
    return request({
      method: "GET",
      url: `/admin/address/address-user/${idUser}`,
    });
  };
}
