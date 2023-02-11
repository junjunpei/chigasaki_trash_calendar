class VisionsController < ApplicationController
  require 'csv'

  def upload
    data = []
    csv = CSV.table('./app/assets/trash_1.csv')
    (1..8).to_a.each do |i|
      CSV.foreach("./app/assets/region.csv", headers: true) do |n|
        data.push(n["Region#{i}"])
        # @data = n["region#{i}"]
      end
    end
    date = csv[:date1]
    trash = csv[:trash]
    render json: data
    # images = []
    # image = File.open('./app/assets/trash.png')
    # if upload_file
    #   images.push(upload_file)
    # end
    # image = '../../../assets/images/trash.png'
    # if upload_file
    #   images << upload_file
    # end
    # send_images(image)

    # render json: @result
  end

  # def send_images(image)
  #   image_annotator_client = Google::Cloud::Vision::V1::ImageAnnotator::Client.new
  #   @result = image_annotator_client.document_text_detection image: image, image_context: {language_hints: [:ja, :en]}
  # end
end
