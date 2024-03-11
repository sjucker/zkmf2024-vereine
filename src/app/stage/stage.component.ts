import {Component, Input, OnInit} from '@angular/core';
import init, {add, read_data, set_data} from "../../assets/wasm_stage"

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {

  @Input()
  canvasId = 'stage_canvas';

  ngOnInit(): void {
    init("/assets/stager-3ab7e46af3d2a755_bg.wasm")
  }

  add_to_canvas(data: string): void {
    add(this.canvasId, data);
  }

  update_data(data: string): void {
    set_data(data);
  }

  get_data(): string {
    return read_data();
  }

  testWasmAddToCanvasWithData(): void {
    this.add_to_canvas("{\"rows\":{\"row_1\":8,\"row_2\":{\"left\":3,\"mid\":6,\"right\":3},\"row_3\":{\"left\":1,\"mid\":6,\"right\":4},\"row_4\":{\"left\":2,\"mid\":5,\"right\":5}},\"instruments\":[{\"id\":\"P_XF\",\"pos\":{\"x\":-154.0,\"y\":-196.0}},{\"id\":\"P_XG\",\"pos\":{\"x\":-148.0,\"y\":-151.33337}},{\"id\":\"P_M\",\"pos\":{\"x\":-44.0,\"y\":-190.33337}},{\"id\":\"B_SC_1\",\"pos\":{\"x\":207.0,\"y\":-220.33337}},{\"id\":\"B_SC_2\",\"pos\":{\"x\":178.0,\"y\":-217.33337}},{\"id\":\"B_SC_3\",\"pos\":{\"x\":148.0,\"y\":-214.33337}},{\"id\":\"B_TT_32\",\"pos\":{\"x\":91.0,\"y\":-152.33337}},{\"id\":\"B_TT_40\",\"pos\":{\"x\":194.0,\"y\":-156.33337}},{\"id\":\"F_4PA\",\"pos\":{\"x\":-372.0,\"y\":-86.333374}},{\"id\":\"P_B\",\"pos\":{\"x\":-482.0,\"y\":-25.333374}},{\"id\":\"P_S\",\"pos\":{\"x\":-435.0,\"y\":-35.333374}},{\"id\":\"F_GT\",\"pos\":{\"x\":314.0,\"y\":-123.333374}},{\"id\":\"P_C\",\"pos\":{\"x\":401.0,\"y\":-90.333374}},{\"id\":\"P_R\",\"pos\":{\"x\":471.0,\"y\":-26.333374}}]}");
  }

  testWasmAddToCanvas(): void {
    this.add_to_canvas("{}");
  }

  testWasmSetData(): void {
    this.update_data("{\"rows\":{\"row_1\":8,\"row_2\":{\"left\":3,\"mid\":6,\"right\":3},\"row_3\":{\"left\":1,\"mid\":6,\"right\":4},\"row_4\":{\"left\":2,\"mid\":5,\"right\":5}},\"instruments\":[{\"id\":\"P_XF\",\"pos\":{\"x\":-154.0,\"y\":-196.0}},{\"id\":\"P_XG\",\"pos\":{\"x\":-148.0,\"y\":-151.33337}},{\"id\":\"P_M\",\"pos\":{\"x\":-44.0,\"y\":-190.33337}},{\"id\":\"B_SC_1\",\"pos\":{\"x\":207.0,\"y\":-220.33337}},{\"id\":\"B_SC_2\",\"pos\":{\"x\":178.0,\"y\":-217.33337}},{\"id\":\"B_SC_3\",\"pos\":{\"x\":148.0,\"y\":-214.33337}},{\"id\":\"B_TT_32\",\"pos\":{\"x\":91.0,\"y\":-152.33337}},{\"id\":\"B_TT_40\",\"pos\":{\"x\":194.0,\"y\":-156.33337}},{\"id\":\"F_4PA\",\"pos\":{\"x\":-372.0,\"y\":-86.333374}},{\"id\":\"P_B\",\"pos\":{\"x\":-482.0,\"y\":-25.333374}},{\"id\":\"P_S\",\"pos\":{\"x\":-435.0,\"y\":-35.333374}},{\"id\":\"F_GT\",\"pos\":{\"x\":314.0,\"y\":-123.333374}},{\"id\":\"P_C\",\"pos\":{\"x\":401.0,\"y\":-90.333374}},{\"id\":\"P_R\",\"pos\":{\"x\":471.0,\"y\":-26.333374}}]}");
  }

  testWasmResetData(): void {
    this.update_data("{}");
  }

  testWasmGetData(): void {
    console.log("Reading from wasm: ", this.get_data());
  }
}
