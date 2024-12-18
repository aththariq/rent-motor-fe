import React from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);

const SearchBar = ({ onSearch }) => {
  return (
    <Space direction="vertical">
      <Search placeholder="Cari motor.." onSearch={onSearch} enterButton className="w-72 md:w-96"/>
    </Space>
  );
};

export default SearchBar;
