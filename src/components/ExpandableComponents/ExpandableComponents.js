import React from 'react';
import Expandable from '../Expandable/Expandable';
import classes from './ExpandableComponents.css';

const expandableComponents = (props) => {
    const expandableComponent = props.expandableComponentsData.map(expandableComponent => {
        return (
              <Expandable
                  expandableSummaryComponent={expandableComponent.summaryComponent}
                  expandableActions={expandableComponent.actions}
                  expandableSummary={expandableComponent.summary}>
                  {expandableComponent.detail}
              </Expandable>
        )
    });
    return (
        <div className={classes.ExpandableComponents}>
            {expandableComponent}
        </div>
    );
};

export default expandableComponents;