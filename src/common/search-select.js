import React, { Component } from "react";
import { Row, Col, Select, Input, Icon } from "antd";

import "./index.scss";
const { Option } = Select;
const { Search } = Input;

class Search_Select extends Component {
  handleChange = (value) => {};
  render() {
    const { sort } = this.props;
    return (
      <div className='search-select container'>
        <Row type='flex' justify='space-between' align='bottom'>
          <Col span={4} className='select-dropdown'>
            {sort ? (
              <Select
                defaultValue='A-Z'
                style={{ width: 120 }}
                onChange={this.handleChange}>
                <Option value='a-z'>A-Z</Option>
                <Option value='z-a'>Z-A</Option>
              </Select>
            ) : null}
          </Col>
          <Col span={10}>
            <Search
              placeholder='input search text'
              onSearch={(value) => console.log(value)}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Search_Select;
