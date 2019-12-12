import React from 'react';

import {Row} from "shards-react";

import {Redirect} from "react-router-dom";

import PageTitle from "../common/PageTitle";

import AuthContext from './../../context/auth-context';
import {API_BASE_URL} from "./../../utils/Services";

import "react-tabulator/lib/styles.css";
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css";

import { React15Tabulator } from "react-tabulator";

class PostsTable extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.handleRowClicked = this.handleRowClicked.bind(this);
    this.handleTableResponse = this.handleTableResponse.bind(this);
    this.handleTableError = this.handleTableError.bind(this);
    this.state = {
      data: [],
      redirectToPost: false,
      redirectPostId: -1,
    };
    this.ref = null;
  }

  handleRowClicked(e, row) {
    const postId = row._row.data.id;
    this.setState({
      redirectToPost: true,
      redirectPostId: postId,
    });
  }

  handleTableError(xhr, textStatus, errorThrown) {
    this.setState({
      redirectToReferrer: true
    });
  }

  handleTableResponse(url, params, response) {
    this.setState({
      'data' : response.payload.content,
    });
    return {
      'data' : response.payload.content,
      'last_page' : response.payload.totalPages,
    };
  }

  render() {

    //Redirect  To  Post
    if(this.state.redirectToPost) {
      const url = ((this.context.userData.userName === this.props.userName) ? '/edit-post/' : '/post-preview/') + this.state.redirectPostId;
      return (<Redirect push to={url} />);
    }


    const columns = [
      { title: "Poster", field: "poster.userName", },
      { title: "Company", field: "companyName", headerFilter: "input" },
      { title: "Title", field: "title"},
      { title: "Description", field: "shortDescription", headerFilter: "input" },
      { title: "Job type", field: "jobType.name", headerFilter: "input" },
      { title: "Active", field: "active", formatter: "tickCross", align: "center"},
      { title: "Created at", field: "created" },
    ];

    const userName = this.props.userName;

    const options = {
      rowClick: this.handleRowClicked,
      pagination: "remote",
      paginationSize:10,
      ajaxURL: API_BASE_URL + "/user/" + userName + "/posts",
      ajaxConfig:{
        method:"GET", //set request type to Position
        headers: {
            "Authorization": 'Bearer ' + this.context.authToken,
        },
      },
      ajaxResponse:this.handleTableResponse,
      ajaxError: this.handleTableError,
      dataTree:true,
    };

    return (
      <div>
        <Row noGutters className="page-header py-4">
          <PageTitle title="User Posts" md="12" className="ml-sm-auto mr-sm-auto" />
        </Row>
        <Row>
          <React15Tabulator
              ref={ref => (this.ref = ref)}
              columns={columns}
              data={this.state.data}
              options={options}
              data-custom-attr="test-custom-attribute"
              className="custom-css-class"
            />
        </Row>
      </div>
    );
  }
}

export default PostsTable;
