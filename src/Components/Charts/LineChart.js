import React, {useState, useEffect} from 'react';
import {Dimensions, View, Text} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';
import moment from 'moment';

const WIDTH = Dimensions.get("window").width - 40;

const ScrollingChartWithPointer = ({activePeriod, currency, ptData}) => {
    const [spacing, setSpacing] = useState(40);
    const [filteredData, setFilteredData] = useState([]);

    const filterDataByPeriod = (data, period) => {
        const endDate = moment();
        let startDate;

        switch (period) {
            case 'Week':
                startDate = endDate.clone().subtract(1, 'week');
                break;
            case 'Month':
                startDate = endDate.clone().subtract(1, 'month');
                break;
            case 'Year':
                startDate = endDate.clone().subtract(1, 'year');
                break;
            case 'All Time':
                startDate = data.reduce((minDate, item) => {
                    const itemDate = moment(item.date, 'D MMM YYYY');
                    return minDate.isBefore(itemDate) ? minDate : itemDate;
                }, moment());
                break;
            default:
                return data;
        }
        console.log("startDate", startDate)
        // Filter data based on date range
        let filteredData = data.filter(item => {
            const itemDate = moment(item.date, 'D MMM YYYY');
            return itemDate.isBetween(startDate, endDate);
        });

        const sampleRate = Math.ceil(filteredData.length / 50);
        if (sampleRate > 1) {
            filteredData = filteredData.filter((item, index) => index % sampleRate === 0);
        }

        const maxDataPoints = 50;
        const numDataPoints = Math.max(Math.min(filteredData.length, maxDataPoints), 1);
        let calculatedSpacing = numDataPoints < maxDataPoints ? WIDTH / numDataPoints : WIDTH / maxDataPoints;
        calculatedSpacing = calculatedSpacing - 1;
        return {filteredData, spacing: calculatedSpacing};
    };

    useEffect(() => {
        const {filteredData, spacing} = filterDataByPeriod(ptData, activePeriod);
        setFilteredData(filteredData);
        setSpacing(spacing);
        // The chart will now be updated with filteredData and new spacing
    }, [activePeriod]);

    const showItems = (items) => {
        console.log("items", items)
        return items[0].date
    }
    return (
        <View
            style={{
                paddingVertical: 20,
                backgroundColor: 'transparent',
                width: "100%",
            }}>
            <LineChart
                areaChart
                curved
                data={filteredData}
                // rotateLabel
                width={WIDTH}
                hideDataPoints
                spacing={spacing}
                color="#fff"
                thickness={3}
                startFillColor="rgba(255,255,255,0.2)"
                endFillColor="rgba(20,85,81,0.01)"
                startOpacity={0.5}
                endOpacity={0.1}
                // initialSpacing={0}
                // noOfSections={4}
                // stepHeight={50}
                height={200}
                maxValue={600}
                // yAxisColor="white"
                yAxisThickness={0}
                // rulesType={ruleTypes.SOLID}
                rulesColor="transparent"
                yAxisTextStyle={{color: '#888'}}
                // yAxisLabelPrefix="hello"
                // yAxisTextNumberOfLines={2}
                yAxisLabelWidth={0}
                // yAxisSide='right'
                // xAxisColor="lightgray"
                xAxisThickness={0}
                pointerConfig={{
                    pointerStripHeight: 160,
                    pointerStripColor: 'lightgray',
                    pointerStripWidth: 2,
                    pointerColor: 'lightgray',
                    radius: 6,
                    pointerLabelWidth: 100,
                    pointerLabelHeight: 90,
                    // activatePointersOnLongPress: true,
                    autoAdjustPointerLabelPosition: false,
                    pointerLabelComponent: items => {
                        return (
                            <View
                                style={{
                                    justifyContent: 'center',
                                    marginLeft: -40,
                                    backgroundColor: "transparent"
                                }}>
                                <Text
                                    style={{
                                        color: 'white',
                                        fontSize: 14,
                                        marginBottom: 6,
                                        textAlign: 'center',
                                    }}>
                                    {showItems(items)}
                                </Text>

                                <View
                                    style={{
                                        paddingVertical: 6,
                                        borderRadius: 16,
                                        backgroundColor: 'white',
                                    }}>
                                    <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                                        {currency + items[0].value + '.0'}
                                    </Text>
                                </View>
                            </View>
                        );
                    },
                }}
            />
        </View>
    );
};

export default ScrollingChartWithPointer;