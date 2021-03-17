#include "WbUrdfRobot.hpp"

void WbUrdfRobot::init() {
}

WbUrdfRobot::WbUrdfRobot(WbTokenizer *tokenizer) : WbRobot("UrdfRobot", tokenizer) {
  init();
}

WbUrdfRobot::WbUrdfRobot(const WbUrdfRobot &other) : WbRobot(other) {
  init();
}

WbUrdfRobot::WbUrdfRobot(const WbNode &other) : WbRobot(other) {
  init();
}

WbUrdfRobot::~WbUrdfRobot() {
}
