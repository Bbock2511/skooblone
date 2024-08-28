import {
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { Agenda, LocaleConfig } from "react-native-calendars";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import XDate from "xdate";
import AddBookAgendaModal from "../../components/AddBookAgendaModal";
import getEventsFromAsyncStorage from "../../functions/getEventsFromAsyncStorage";
import { useSelector } from "react-redux";

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

  const handleShowModal = () => {
    setShowModal(false);
  };

  const getEvents = async () => {
    getEventsFromAsyncStorage(userName).then((events) => {
      setEvents(convertToAgendaFormat(events));
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
      formattedEvents[event.date].push({
        id: event.id,
        name: event.title,
      });
    });
    return formattedEvents;
  };

  return (
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
            <View
              style={{
                flex: 1,
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Text>
                {item.name == undefined ? (item.name = "Nada") : item.name}
              </Text>
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
});
export default AgendaScreen;
