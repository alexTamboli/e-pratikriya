import React from "react";

function Parameters() {
    return (
<div class="form-floating">
      <div class="row g-3 align-items-center">
        <div class="container">
          <div class="row row-cols-2">
            <div class="col">
              <div class="col-auto">
                <label for="" class="col-form-label">
                  Select City
                </label>
              </div>
              <div class="col-auto">
                <input className="form-control" type="text"/>
              </div>
            </div>

            <div class="col">
              <div class="col-auto">
                <label for="" class="col-form-label">
                  Select District
                </label>
              </div>
              <div class="col-auto">
                <input className="form-control" type="text"/>
              </div>
            </div>
          </div>
          <div class="row row-cols-2">
            <div class="col">
              <div class="col-auto">
                <label for="" class="col-form-label">
                  Select Sub-Division/Area
                </label>
              </div>
              <div class="col-auto">
                <input className="form-control" type="text"/>
              </div>
            </div>

            <div class="col">
              <div class="col-auto">
                <label for="" class="col-form-label">
                  Select Police Station
                </label>
              </div>
              <div class="col-auto">
                <input className="form-control" type="text"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Parameters;