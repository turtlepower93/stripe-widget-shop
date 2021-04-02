import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import CardGrid from '../../components/CardGrid/CardGrid'
import { useEffect, useState, useRef } from 'react'
import * as widgetsAPI from '../../utilities/widgets-api'

const useStyles = makeStyles((theme) => ({
  headerText: {
    margin: 25
  },
}))

export default function NewOrderPage() {
  const classes = useStyles();
  const [allWidgets, setAllWidgets] = useState();
  const [allLabels, setAllLabels] = useState();
  const [currentTab, setCurrentTab] = useState(0);
  const [currentWidgets, setCurrentWidgets] = useState([]);
  const [tabLabels, setTabLabels] = useState([]);
  const tabRef = useRef(currentTab);

  useEffect(() => {
    async function getWidgets() {

      //Get all Widgets from the database
      const widgets = await widgetsAPI.getAll();
      setAllWidgets(widgets);

      //grabs labels for category navigation
      const grabbedLabels = [];
      widgets.forEach((widget,idx) => {
        if (!grabbedLabels.includes(widget.category.name)) {
          grabbedLabels.push(widget.category.name);
        }
      });
      setAllLabels(grabbedLabels);

      //create Tab components with labels given by category names
      const tabs = grabbedLabels.map((labelObject, idx) => {
        return <Tab key={idx} label={`${labelObject} Widgets`} />
      })
      setTabLabels(tabs);

      const displayWidgets = [];
      await widgets.filter((w) => {
        if(w.category.name === grabbedLabels[0])
        displayWidgets.push(w);
      })
      setCurrentWidgets(displayWidgets);

    };
    getWidgets();
  },[]);

  function handleChange(evt, newValue) {
    setCurrentTab(newValue);
    const changedWidgets = allWidgets.filter((w) => {
      return w.category.name === allLabels[newValue];
    }) 
    setCurrentWidgets(changedWidgets);
  };

  return (
    <>
    <AppBar gutterBottom position="static">
      <Tabs centered onChange={handleChange} value={currentTab} >
        {tabLabels}
      </Tabs>
    </AppBar>
    <div role="tabpanel" index={0}>
      <Container>
        <Box>
          <Typography gutterBottom variant="h2" className={classes.headerText} align="center">
            Widgets, Get your widgets here!
          </Typography>
        </Box>
        <CardGrid widgets={currentWidgets}  />
      </Container>
    </div>
  </>  
  );
};
