import React, { useEffect } from 'react';
import Template from '../../../template/template';
import ArticleForm from './articleForm';
import isEmpty from 'is-empty';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearItem, fetchItem } from '../collectionActions';

function ArticleFormPage(props) {
  const { id } = props.match.params;

  useEffect(() => {
    if (id) {
      props.fetchItem(id);
    } else {
      props.clearItem();
    }
  }, [id]);

  const isNew = isEmpty(props.article);

  return (
    <Template>
      <ArticleForm isNew={isNew} articleData={props.article} />
    </Template>
  );
}

const mapStateToProps = state => ({ article: state.collection.item });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ clearItem, fetchItem }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleFormPage);
