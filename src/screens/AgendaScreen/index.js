import {
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { Agenda, LocaleConfig } from "react-native-calendars";
import XDate from "xdate";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import AddBookAgendaModal from "../../components/AddBookAgendaModal";
import getEventsFromAsyncStorage from "../../functions/getEventsFromAsyncStorage";
import { useSelector } from "react-redux";
import { date } from "yup";

const STATUS_BAR_HEIGHT = Constants.statusBarHeight;

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldPlaySound: false,
//     shouldShowAlert: true,
//     shouldSetBadge: false,
//   }),
// });

LocaleConfig.locales["pt-br"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan.",
    "Fev.",
    "Mar.",
    "Abr.",
    "Mai.",
    "Jun.",
    "Jul.",
    "Ago.",
    "Set.",
    "Out.",
    "Nov.",
    "Dez.",
  ],
  dayNames: [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ],
  dayNamesShort: ["Dom.", "Seg.", "Ter.", "Qua.", "Qui", "Sex.", "Sáb."],
  today: "Hoje",
};

LocaleConfig.defaultLocale = "pt-br";

const AgendaScreen = () => {
  var actuallyDate = new XDate();
  actuallyDate = actuallyDate.toString("yyyy-MM-dd");

  const { userName } = useSelector((state) => state.user);

  const [selectedDate, setSelectedDate] = useState(actuallyDate);
  const [events, setEvents] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [refreshingModal, setRefreshingModal] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleShowModal = () => {
    setShowModal(false);
  };

  const getEvents = async () => {
    getEventsFromAsyncStorage(userName).then((events) => {
      setEvents(convertToAgendaFormat(events));
      setLoaded(true);
    });
  };

  useEffect(() => {
    getEvents();
    setRefreshingModal(true);
  }, [selectedDate]);

  const convertToAgendaFormat = (events) => {
    const formattedEvents = {};
    events.forEach((event) => {
      if (!formattedEvents[event.date]) {
        formattedEvents[event.date] = [];
      }
      const eventObj = {
        id: event.id,
        date: event.date,
        name: event.title,
      };
      formattedEvents[event.date].push(eventObj);

    });
    return formattedEvents;
  };

  return (
    <SafeAreaView style={styles.container}>
      {loaded ? (
        <SafeAreaView style={styles.container}>
          <Agenda
            onDayPress={(day) => setSelectedDate(day.dateString)}
            selected={selectedDate}
            calendarStyle={{
              backgroundColor: "#E8D49E",
              elevation: 5,
            }}
            theme={{
              backgroundColor: "#E8D49E",
              calendarBackground: "#E8D49E",
              textSectionTitleColor: "tomato",
              selectedDayBackgroundColor: "tomato",
              todayTextColor: "tomato",
              dayTextColor: "black",
              agendaDayNumColor: "tomato",
              agendaDayTextColor: "black",
              agendaTodayColor: "black",
              agendaKnobColor: "tomato",
              dotColor: "tomato",
            }}
            items={events}
            renderItem={(item) => {
              return (
                <View style={styles.eventContainer}>
                  <Text style={styles.eventText} onPress={() => console.log(item)}>{item.name || 'Nada'}</Text>
                </View>
              );
            }}
            renderEmptyData={() => {
              return (
                <View>
                  <Text>Nenhum evento para este dia</Text>
                </View>
              );
            }}
            initialNumToRender={10}
            showOnlySelectedDayItems={true}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowModal(true)}
          >
            <Text
              style={{
                fontSize: 32,
                textAlign: "center",
                textAlignVertical: "center",
                color: "#efefef",
              }}
            >
              +
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ textAlign: 'center' }}>Carregando...</Text>
        </View>
      )}

      <AddBookAgendaModal
        show={showModal}
        handleClose={handleShowModal}
        selectedDay={selectedDate}
        refresh={refreshingModal}
        setRefresh={setRefreshingModal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8D49E",
    marginTop: STATUS_BAR_HEIGHT,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "tomato",
    position: "absolute",
    bottom: 20,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  eventContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 2,
  },
  eventText: {
    fontSize: 16,
    color: '#333',
  },
});
export default AgendaScreen;
