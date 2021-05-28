# Copyright 1996-2021 Cyberbotics Ltd.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Example of Python controller for Nao robot.
   This demonstrates how play motion files."""

from controller import Robot, Motion


class Nao (Robot):
    def __init__(self):
        Robot.__init__(self)
        self.handWave = Motion('../../motions/HandWave.motion')
        self.forwards = Motion('../../motions/Forwards50.motion')
        self.backwards = Motion('../../motions/Backwards.motion')
        self.sideStepLeft = Motion('../../motions/SideStepLeft.motion')
        self.sideStepRight = Motion('../../motions/SideStepRight.motion')
        self.turnLeft60 = Motion('../../motions/TurnLeft60.motion')
        self.turnRight60 = Motion('../../motions/TurnRight60.motion')
        self.timeStep = int(self.getBasicTimeStep())

    def run(self):
        print(self.timeStep)
        self.forwards.setLoop(True)
        self.forwards.play()
        while self.step(self.timeStep) != -1:
            if self.getTime() > 10:
                break
        self.forwards.stop()
        self.turnRight60.play()
        while self.step(self.timeStep) != -1:
            pass


# create the Robot instance and run main loop
robot = Nao()
robot.run()
