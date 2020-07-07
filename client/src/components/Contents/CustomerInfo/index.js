import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import CustomerTablePage from './CustomerTablePage';
import CustomerInfoPage from './CustomerInfoPage';
import BorderButton from 'common/Button/BorderButton';
import Modal from 'common/Modal/ModalCover';
import CustomerModalContent from './CustomerModal';
import OrderModalContent from 'components/Contents/OrderRelease/OrderModal';
import Config from 'config';

import './index.css';

const CustomerInfo = (props) => {
  const [siteList, setSiteList] = useState([]); // 지점 리스트
  const [customerTotal, setCustomerTotal] = useState(0); // 고객 수
  const [customerData, setCustomerData] = useState([]);
  const [selectCustomer, setSelectCustomer] = useState({});
  const [customerOrderList, setCustomerOrderList] = useState({});

  // Modal State
  const [isModal, setIsModal] = useState({
    view: false,
    type: '',
    data: {}
  });

  // close modal
  const toggleModal = () => {
    setIsModal({ ...isModal,
      view: !isModal.view,
      type: '',
      data: {}
    });
  };

  const viewModal = async (type, data) => {
    setIsModal({
      ...isModal,
      view: !isModal.view,
      type: type,
      data: data || {}
    });
  };

  const addCustomer = () => {
    console.log('btn click');
  };

  // Site List 정보 가져오기
  const getSiteList = async () => {
    let options = {
<<<<<<< HEAD
      url: `http://${Config.API_HOST.IP}/api/account/siteslist`,
=======
      url: `http://${Config.URI}/api/account/siteslist`,
>>>>>>> Rebase Test Commit
      method: 'post'
    };

    try {
      let setData = await axios(options);
      let result = setData?.data?.data;
      if (result) setSiteList(result);
      console.log(result);
    } catch (e) {
      console.log('ERROR', e);
    }
  };

  const getCustomerList = async (start) => {
    let options = {
<<<<<<< HEAD
      url: `http://${Config.API_HOST.IP}/api/customer/select`,
=======
      url: `http://${Config.URI}/api/customer/select`,
>>>>>>> Rebase Test Commit
      method: 'post',
      data: {
        start: start || 1
      }
    };

    let countOption = {
<<<<<<< HEAD
      url: `http://${Config.API_HOST.IP}/api/order/making/count`,
=======
      url: `http://${Config.URI}/api/order/making/count`,
>>>>>>> Rebase Test Commit
      method: 'post',
      data: {
        category: 'customer',
      }
    };

    try {
      setCustomerData([]);
      let listSetData = await axios(options);
      let countSetData = await axios(countOption);

      let result = listSetData?.data?.data; // list result
      let count = countSetData?.data?.data?.total; // count result

      let items = [];
      if (result) {
        for (let i in result) {
          if (Object.prototype.hasOwnProperty.call(result, i)) {
            let row = result[i];

            let convertData = {
              ...row,
              create_at: moment(new Date(row.create_at)).format('YYYY.MM.DD'),
              lastorder: row.lastorder ? moment(new Date(row.lastorder)).format('YYYY.MM.DD') : '최근 주문 내역이 없습니다.'
            };

            items.push(convertData);
          }
        }
      }

      console.log('customer:::', result);
      setCustomerData(items);
      setCustomerTotal(count);
      // 데이터가 존재하면 첫번째 요소를 자동으로 선택
      if (result?.length > 0) setSelectCustomer(result[0]);
    } catch (e) {
      console.log('ERROR', e);
    }
  };

  const getOrderListByCustomer = async (data, start) => {
    let options = {
      url: `http://${Config.URI}/api/order/making`,
      method: 'post',
      data: {
        category: 'order',
        action: 's',
        start: start || 1,
        search_field: 'name',
        search_word: data.name,
        search_telpno: data.telpno.replace(/[^0-9]/g, '')
      }
    };

    try {
      console.log('orderlsit:::', options);
      let setData = await axios(options);

      let result = setData.data.data;
      console.log('selec', result);

<<<<<<< HEAD
=======
      setCustomerOrderList(result);
      setSelectCustomer(data);
      
>>>>>>> Rebase Test Commit
    } catch (e) {
      console.log('ERROR', e);
    }
  };

  useEffect(() => {
    if (siteList.length === 0) getSiteList(); // 지점 리스트
    if (customerData.length === 0) getCustomerList();
  }, [siteList]);

  return (
    <React.Fragment>
      <div className="ct_layout">
        <div className="ct_title">
          <div className="_lt">
            <div className="_title">
              고객 관리
            </div>
          </div>
          <div className="_rt">
            <div className="_more">
              <BorderButton
                addClass="addCustomerBtn"
                onHandle={() => viewModal('insertCustomer')}
                name="고객등록"
              />
            </div>
          </div>
        </div>
        <div className="ct_flex">
          <CustomerTablePage
            data={customerData}
            total={customerTotal}
            setSelectCustomer={getOrderListByCustomer}
            getCustomerList={getCustomerList}
          />
          <CustomerInfoPage
            selectCustomer={selectCustomer}
            orderList={customerOrderList}
            viewModal={data => viewModal('showCustomer', data)}
          />
        </div>
        <Modal
          set={isModal}
          hide={toggleModal}
          title={isModal.type === 'showOrder' ? '주문 정보' : 'Customer Card'}
          style={isModal.type === 'showOrder' ? { width: '500px', height: '685px' } : { width: '500px', height: 'fit-content' }}
          contents={isModal.type === 'showOrder' ? OrderModalContent : CustomerModalContent}
          items={{ type: isModal.type, siteList: siteList }}
        />
      </div>
    </React.Fragment>
  );
};

export default CustomerInfo;
