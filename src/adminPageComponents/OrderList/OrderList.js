import React from "react";
import { getAllFromTableAdmin, getAllFromTableClient } from "../../utils";
import { Filters } from "../Filters";
import { Paginator } from "../Paginator";
import { Spinner } from "../../core/Spinner";
import { SEARCH_LIMIT } from "../../utils";
import OrderCard from "./OrderCard";

import "./OrderList.scss";

class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      isDataLoaded: false,
      filters: "",
      filtersTemplate: [
        {
          name: "createdAt",
          options: [
            { value: "", text: "Срок" },
            {
              value: `[$gt]=${new Date().setHours(0, 0, 0, 0)}`,
              text: "За сутки",
            },
            {
              value: `[$gt]=${new Date().setHours(0, 0, 0, 0) - 604800000}`,
              text: "За неделю",
            },
            {
              value: `[$gt]=${new Date().setHours(0, 0, 0, 0) - 2592000000}`,
              text: "За месяц",
            },
          ],
        },
        {
          name: "orderStatusId",
          options: [
            { value: "", text: "Статус" },
            {
              value: "=5e26a1f0099b810b946c5d8b",
              text: "Выполнен",
            },
            {
              value: "=5e26a191099b810b946c5d89",
              text: "Создан",
            },
            {
              value: "=5e26a1f5099b810b946c5d8c",
              text: "Отменён",
            },
          ],
        },
      ],
    };
    this.paginator = React.createRef();
  }

  componentDidMount = async () => {
    await this.initOrders();
    const cities = await getAllFromTableClient("city");
    let citiesFilter = cities.data.map((e) => ({
      value: `=${e.id}`,
      text: e.name,
    }));

    citiesFilter.unshift({ value: "", text: "Город" });

    this.setState((state) => {
      const tmpFilters = state.filtersTemplate;
      tmpFilters.push({
        name: "cityId",
        options: citiesFilter,
      });
      return {
        filtersTemplate: tmpFilters,
      };
    });
  };

  changePage = (newPage) => {
    this.getOrdersFromPage(newPage - 1);
  };

  initOrders = async () => {
    const orders = await getAllFromTableAdmin(
      "order",
      0,
      this.state.filters,
      this.props.bearer
    );
    this.setState({
      orders: orders.data,
      isDataLoaded: true,
      lastPage: Math.max(1, Math.ceil(orders.count / SEARCH_LIMIT)),
    });
  };

  getOrdersFromPage = (page) => {
    this.setState({ isDataLoaded: false }, async () => {
      const orders = await getAllFromTableAdmin(
        "order",
        page,
        this.state.filters,
        this.props.bearer
      );
      this.setState({ orders: orders.data, isDataLoaded: true });
    });
  };

  updateFilters = (filters) => {
    this.setState({ filters }, async () => {
      await this.initOrders();
      this.paginator.current.restorePage();
    });
  };

  render = () => {
    return (
      <div className="OrderList">
        <h2 className="AdminPage-Title">Список заказов</h2>
        <div className="AdminStyledBlock">
          <Filters
            updateFilters={this.updateFilters}
            filters={this.state.filtersTemplate}
          />
          {this.state.isDataLoaded ? (
            <div>
              {this.state.orders.map((e, i) => (
                <OrderCard key={i} order={e} />
              ))}
            </div>
          ) : (
            <Spinner />
          )}
          <Paginator
            ref={this.paginator}
            last={this.state.lastPage}
            onChangePage={this.changePage}
          />
        </div>
      </div>
    );
  };
}

export default OrderList;
