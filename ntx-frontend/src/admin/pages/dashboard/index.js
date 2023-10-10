import React, { useEffect, useState } from "react";
// import { actionCreator } from "../../reducers/actionCreator";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  LineChart,
  Line,
  Bar,
} from "recharts";
import { Row, Col } from "antd";
import { GraphChart } from "./chart";
const Dashboard = (props) => {
  const [data, setData] = useState([]);
  const [xData, setXData] = useState([]);
  const [yData, setYData] = useState([]);
  const [x1Data, setX1Data] = useState([]);
  const [y1Data, setY1Data] = useState([]);

  // useEffect(() => {
  //   props.fetchPackageSubscriptions();
  //   props.fetchSubscriptions({ date: "s" });
  //   props.fetchComplaint({ date: "s" });
  // }, []);

  // useEffect(() => {
  //   if (props.package_subscriptions.length > 0) {
  //     setData(
  //       props.package_subscriptions.map((result) => ({
  //         name: result.name,
  //         value: result.subscriptions.length,
  //       }))
  //     );
  //   }

  //   if (props.subscriptions.length > 0) {
  //     setXData(props.subscriptions.map((result) => result.activation_date));
  //     setYData(props.subscriptions.map((result) => result.total));
  //   }

  //   if (props.complaints.length > 0) {
  //     setX1Data(props.complaints.map((result) => result.createdAt));
  //     setY1Data(props.complaints.map((result) => result.total));
  //   }
  // }, [props.package_subscriptions, props.subscriptions, props.complaints]);
  return (
    <Row gutter={[0, 20]}>
      <Col span={24}>
        <Row align="center" gutter={[0, 20]}>
          <Col span={24}>
            <h3 style={{ textAlign: "center" }}>Package Vs Subscriptions</h3>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={12}>
                <PieChart width={400} height={300}>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    isAnimationActive={true}
                    fill="#8884d8"
                    label
                  />
                  <Tooltip />
                </PieChart>
              </Col>
              <Col span={12}>
                <BarChart width={400} height={300} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[0, 20]}>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <h3 style={{ textAlign: "center" }}>Subscriptions</h3>
              </Col>
              <Col span={24}>
                <GraphChart
                  xData={xData}
                  yData={yData}
                  type="line"
                  height={200}
                  width="100%"
                />
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <h3 style={{ textAlign: "center" }}>Complaints</h3>
              </Col>
              <Col span={24}>
                <GraphChart
                  xData={x1Data}
                  yData={y1Data}
                  type="line"
                  height={200}
                  width="100%"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Dashboard;
