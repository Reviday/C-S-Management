import React from 'react';

import BorderButton from 'common/Button/BorderButton';
import Table from 'common/Table';
import Paging from 'common/Paging';

const OrderPage = (props) => {
  const category = props.category; // category is 'order' or 'ship'
  const title = props.title;
  const headerSet = props.headerSet;
  const data = props.data;
  const total = props.total;
  const more = props.more;
  const onMoreBtn = props.onMoreBtn;
  const viewModal = props.viewModal;
  const getOrderList = props.getOrderList;

  return (
    <div className={`ct_layout abs ${more[category] ? 'on' : ''}`}>
      <div className="ct_title">
        <div className="_lt">
          <div className={`_title ${category === 'delay' && 'delay_alert'}`}>
            {title}
            {
              category === 'delay'
                && (<span>{`: ${total}개`}</span>) // 추후에 개수 넘기면 수정
            }
          </div>
        </div>
        <div className="_rt">
          <div className="_more">
            <BorderButton
              addClass="moreBtn"
              onHandle={() => onMoreBtn(category)}
              name="접기"
            />
          </div>
        </div>
        {
          category === 'order'
            && (
              <div className="_rt">
                <div className="_addOrder">
                  <BorderButton
                    addClass="addOrderBtn"
                    onHandle={() => viewModal('insertOrder')}
                    name="주문 등록"
                  />
                </div>
              </div>
            )
        }
        {
          category === 'receipt'
            ? (
              <div className="_rt">
                <div className="_addOrder">
                  <BorderButton
                    addClass="addOrderBtn"
                    onHandle={() => viewModal('insertOrder')}
                    name="주문 등록"
                  />
                </div>
              </div>
            )
            : null
        }
        
      </div>
      <div className="ct_box">
        <Table
          headerSet={headerSet}
          data={data}
          onClick={data => viewModal('showOrder', data)}
          recordLimit="none"
        />
        <div className="ct_box_footer">
          <div className="rows_flex">
            <Paging
              onClick={start => getOrderList(category, start)}
              totalCount={total}
              listCount={10}
              displayCount={10}
              current={1}
            />
          </div>
          <div className="rows_flex">
            <div className="search_field">
              <select name="sel_field" defaultValue="default">
                <option value="default" disabled hidden>검색영역</option>
                <option value="site">지점</option>
                <option value="name">고객명</option>
                <option value="product">품명</option>
              </select>
              <input type="text" className="search" placeholder="Search" />
              <button type="button" className="search_btn" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;