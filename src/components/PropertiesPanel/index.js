import React, { Component } from 'react';
import { getSelectedNode, getSelectedSubnetwork } from 'selectors';
import { nodePropTypes, subnetworkPropTypes } from 'models';

import PropTypes from 'prop-types';
import GenericPanel from 'components/GenericPanel';
import PropertiesNetwork from 'components/PropertiesNetwork';
import PropertiesNode from 'components/PropertiesNode';
import PropertiesSuperNode from 'components/PropertiesSuperNode';
import { connect } from 'react-redux';
import styles from './styles.css';

class PropertiesPanel extends Component {
  renderContent = () => {
    const {
      selectedNode,
      onEditNodeStates,
      onEditNodeCpt,
      onStartConnection,
      selectedSubnetwork,
      onViewSubnetwork,
      onViewLinkages,
    } = this.props;

    if (selectedNode) {
      return (
        <PropertiesNode
          node={selectedNode}
          onEditNodeStates={onEditNodeStates}
          onEditNodeCpt={onEditNodeCpt}
        />
      );
    } if (selectedSubnetwork) {
      return (
        <PropertiesSuperNode
          subnetwork={selectedSubnetwork}
          onStartConnection={onStartConnection}
          onViewSubnetwork={onViewSubnetwork}
          onViewLinkages={onViewLinkages}
        />
      );
    }

    return (
      <PropertiesNetwork />
    );
  };

  render() {
    return (
      <GenericPanel classNames={styles.genericPanel}>
        {this.renderContent()}
      </GenericPanel>
    );
  }
}

PropertiesPanel.propTypes = {
  selectedNode: nodePropTypes,
  onEditNodeStates: PropTypes.func.isRequired,
  onEditNodeCpt: PropTypes.func.isRequired,
  onStartConnection: PropTypes.func.isRequired,
  onViewSubnetwork: PropTypes.func.isRequired,
  onViewLinkages: PropTypes.func.isRequired,
  selectedSubnetwork: subnetworkPropTypes,
};

PropertiesPanel.defaultProps = {
  selectedNode: null,
  selectedSubnetwork: null,
};

const mapStateToProps = state => ({
  selectedNode: getSelectedNode(state),
  selectedSubnetwork: getSelectedSubnetwork(state),
});

export default connect(mapStateToProps)(PropertiesPanel);
