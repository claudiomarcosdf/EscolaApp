var delays = 80,
  durations = 500;

const emailsSubscriptionChart = {
  data: {
    labels: ['Excepcional', 'Ótimo', 'Bom', 'Regular', 'Insuficiente', 'Mau'],
    series: [[2, 5, 20, 7, 4, 1]]
  },

  options: {
    reverseData: true,
    horizontalBars: true,
    axisX: {
      showGrid: true,
      offset: 15,
      scaleMinSpace: 50
    },
    axisY: {
      offset: 90
    },
    // high: 10,
    chartPadding: {
      top: 0,
      right: 20,
      bottom: 0,
      left: 0
    }
  },
  responsiveOptions: [
    [
      'screen and (max-width: 740px)',
      {
        seriesBarDistance: 50,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }
    ]
  ],
  animation: {
    draw: function (data) {
      if (data.type === 'Bar') {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    }
  }
};

module.exports = {
  emailsSubscriptionChart
};
