
var form = document.getElementById("myForm");
function handleForm(event) { event.preventDefault(); }
form.addEventListener('submit', handleForm);
var n = 0;
const nem = () => {
    document.querySelector("#result").style.setProperty("--percent", n);
};
setInterval(nem, 2000);
setTimeout(nem);
function genNumber() {
    document.getElementById('result').style.visibility = 'visible';
    n = Math.floor(Math.random() * 100) / 100;
    if (n >= .70) {
        document.getElementById('resulttext').innerHTML = "YOU ARE NOT SAFE! ";
    }
    else if (n < .70 && n >= .40) { document.getElementById('resulttext').innerHTML = "NOT HIGH RISK BUT BE CAREFUL!"; }
    else {
        document.getElementById('resulttext').innerHTML = "YOU ARE ON THE SAFER SIDE!";
    }
};

var data2 = [{ name: 'Delhi', value: 40 }, { name: 'Mumbai', value: 90 }, { name: 'Pune', value: 60 }, { name: 'Kolkata', value: 10 },
{ name: 'Bangalore', value: 37 }, { name: 'Chennai', value: 57 }, { name: 'Hyderabad', value: 24 }];

$.getJSON('https://api.mocki.io/v1/bc2cc5e5', function (data1) {
    console.log(data1);

});

var data = [
    ['in-py', 110],
    ['in-ld', 114],
    ['in-wb', 218],
    ['in-or', 132],
    ['in-br', 144],
    ['in-sk', 156],
    ['in-ct', 164],
    ['in-tn', 173],
    ['in-mp', 182],
    ['in-2984', 19],
    ['in-ga', 110],
    ['in-nl', 111],
    ['in-mn', 112],
    ['in-ar', 113],
    ['in-mz', 114],
    ['in-tr', 115],
    ['in-3464', 116],
    ['in-dl', 117],
    ['in-hr', 118],
    ['in-ch', 119],
    ['in-hp', 210],
    ['in-jk', 191],
    ['in-kl', 122],
    ['in-ka', 163],
    ['in-dn', 174],
    ['in-mh', 815],
    ['in-as', 126],
    ['in-ap', 217],
    ['in-ml', 218],
    ['in-pb', 291],
    ['in-rj', 310],
    ['in-up', 311],
    ['in-ut', 812],
    ['in-jh', 133]
];



Highcharts.setOptions({
    colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
});

// Create the chart
Highcharts.mapChart('map', {
    chart: {
        map: 'countries/in/in-all',
        backgroundColor: 'rgba(0,0,0,0)'

    },

    title: {
        text: 'Cases per State',
        style: {
            color: '#FFFFFF',
        }

    },

    subtitle: {
        text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/in/in-all.js">India</a>',
        style: {
            color: '#FFFFFF',
        }


    },

    mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
    },

    colorAxis: {
        min: 0,
        minColor: '#8bc9c4',
        maxColor: '#05403b',
        tickColor: '#FFFFFF'
    },

    series: [{
        data: data,
        name: 'Missing Person Cases',
        states: {
            hover: {
                color: '#55fae9'
            }
        },

        dataLabels: {
            enabled: false,
            format: '{point.name}'
        }
    }],
    legend: {
        itemStyle: {
            color: 'blue'
        }
    },
    credits: {
        enabled: false
    }
});


Highcharts.chart('bubble', {
    chart: {
        type: 'packedbubble',
        height: '85%',
        backgroundColor: 'rgba(0,0,0,0)'

    },
    title: {
        text: 'Cases in the country',
        style: {
            color: '#ffffff'
        }
    },
    tooltip: {
        useHTML: true,
        pointFormat: '<b>{point.name}:</b> {point.value} Cases'
    },
    colorAxis: {
        min: 0,
        minColor: '#33ccbf',
        maxColor: '#01293d',
        tickColor: '#FFFFFF'
    },
    plotOptions: {
        packedbubble: {
            minSize: '20%',
            maxSize: '100%',
            zMin: 0,
            zMax: 300,
            layoutAlgorithm: {
                gravitationalConstant: 0.04,
                splitSeries: true,
                seriesInteraction: false,
                dragBetweenSeries: true,
                parentNodeLimit: true
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}',
                filter: {
                    property: 'y',
                    operator: '>',
                    value: 40
                },
                style: {
                    color: 'black',
                    textOutline: 'none',
                    fontWeight: 'normal'
                }
            }
        }
    },
    series: [{

        name: 'India',
        data: data2,
        color: '#078a7f'
    }],
    credits: {
        enabled: false
    }
});

Highcharts.chart('gender', {
    chart: {
        type: 'column',
        height: '87%',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    title: {
        text: 'Cases by Gender per Year',
        style: {
            color: '#ffffff'
        }
    },
    xAxis: {
        categories: ['2017', '2018', '2019', '2020', '2021'],
        labels: {
            style: {
                color: 'white'
            }
        }

    },
    yAxis: {
        labels: {
            style: {
                color: 'white'
            }
        }
    },
    legend: {
        itemStyle: {
            color: 'white'
        }
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Female',
        data: [15, 13, 14, 7, 12],
        color: '#57ff73'
    }, {
        name: 'Male',
        data: [2, 2, 3, 2, 1],
        color: '#0a89c4'
    }, {
        name: 'Other',
        data: [7, 4, 8, 12, 5],
        color: '#bafff3'
    }]
});

Highcharts.chart('dept', {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45
        },
        height: '87%',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    title: {
        text: 'Cases, Department wise',
        style: {
            color: '#ffffff'
        }
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            innerSize: 100,
            depth: 45,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                color: 'white'
            }
        }
    },
    legend: {
        itemStyle: {
            color: 'white'
        }
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Department',
        data: [{
            name: 'Missing People',
            y: 61.41
        },
        {
            name: 'Rape',
            y: 11.84
        },
        {
            name: 'Manslaughter',
            y: 10.85
        },
        {
            name: 'Murder',
            y: 4.67
        },
        {
            name: 'Theft and Arson',
            y: 4.18
        },
        {
            name: 'Other',
            y: 7.05
        }
        ],
        colors: ['#b8fff0', '#60dbc1', '#42a691', '#0c856b', '#035241', '#02261f']

    }]
});

// Give the points a 3D feel by adding a radial gradient
Highcharts.chart('threed', {
    chart: {
        type: 'area',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    title: {
        text: 'Cases per age group',
        style: {
            color: '#ffffff'
        }
    },
    xAxis: {
        categories: ['<10', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70', '70+'],
        tickmarkPlacement: 'on',
        title: {
            enabled: false
        }
    },
    yAxis: {
        title: {
            text: 'Hundreds'
        },
        labels: {
            formatter: function () {
                return this.value / 1000;
            },
            style: {
                color: '#ffffff'
            }
        }
    },
    tooltip: {
        split: true,
        valueSuffix: ' Tens'
    },
    plotOptions: {
        area: {
            stacking: 'normal',
            lineColor: '#666666',
            lineWidth: 1,
            marker: {
                lineWidth: 1,
                lineColor: '#666666'
            }
        }
    },
    legend: {
        itemStyle: {
            color: 'white'
        }
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Female',
        data: [6744, 3634, 5268, 502, 635, 809, 947, 1402]
    }, {
        name: 'Male',
        data: [4263, 1766, 106, 107, 111, 133, 221, 767]
    }, {
        name: 'Other',
        data: [531, 163, 203, 276, 408, 547, 729, 628]
    }],
    colors: ['#b8fff0', '#60dbc1', '#42a691', '#0c856b', '#035241', '#02261f']

});

