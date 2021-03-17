// Copyright 1996-2021 Cyberbotics Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

#ifndef WB_URDF_ROBOT_HPP
#define WB_URDF_ROBOT_HPP

#include "WbRobot.hpp"

class WbUrdfRobot : public WbRobot {
  Q_OBJECT

public:
  // constructors and destructor
  explicit WbUrdfRobot(WbTokenizer *tokenizer = NULL);
  WbUrdfRobot(const WbUrdfRobot &other);
  explicit WbUrdfRobot(const WbNode &other);
  void init();
};

#endif
