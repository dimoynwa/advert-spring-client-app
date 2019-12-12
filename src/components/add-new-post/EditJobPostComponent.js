import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import PostForm from "../components/add-new-post/PostForm";
// import SidebarActions from "../components/add-new-post/SidebarActions";
// import SidebarCategories from "../components/add-new-post/SidebarCategories";

import {createJobPost} from '../utils/Services';

const EditJobPostComponent = (post) => (
  <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Edit Post" subtitle="Job Posts" className="text-sm-left" />
    </Row>

    <Row>
      {/* Editor */}
      <Col lg="9" md="12">
        <PostForm action={createJobPost} post={post}/>
      </Col>

      {/* Sidebar Widgets */}
      <Col lg="3" md="12">

      </Col>
    </Row>
  </Container>
);

export default EditJobPostComponent;
