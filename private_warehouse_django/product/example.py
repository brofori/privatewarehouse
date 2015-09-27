"""
Simple example showing Clarifai Custom Model training and prediction

This example trains a concept classifier that recognizes photos of the band Phish.
"""

from clarifai_basic import ClarifaiCustomModel


# instantiate clarifai client
clarifai = ClarifaiCustomModel(app_id="QktWAfPJZJS-Ux2w4y9thDnwtPshojLB-Ios8rcy", app_secret="li4IFQ7m1NAV3aOmp9LVPRcefUJjRwAn_BbYdvQF")

concept_name = 'redbull_blue'


PHISH_POSITIVES = [
  'http://www.thedrinksbusiness.com/wordpress/wp-content/uploads/2013/04/redbull1-2.jpg',
  'https://i.imgur.com/Kise1G1.jpg',
  'https://i.imgur.com/wZBDVgD.jpg',
  'https://i.imgur.com/musFOlD.jpg',
  'https://i.imgur.com/Ex8hjcu.jpg',
  'https://i.imgur.com/7kJCYEc.jpg',
  'https://i.imgur.com/rBg1ykM.jpg',
  'https://i.imgur.com/C5iyI5j.jpg',
  'https://i.imgur.com/FbNzAgi.jpg',
  'https://i.imgur.com/tYQSQ8n.jpg'
]

# add the positive example images to the model

for positive_example in PHISH_POSITIVES:
  clarifai.positive(positive_example, concept_name)


# negatives are not required but will help if you want to discriminate between similar concepts
PHISH_NEGATIVES = [
  'https://i.imgur.com/tK2Z9nX.jpg',
  'https://i.imgur.com/zcXU5Ic.jpg',
  'https://i.imgur.com/OsmR5Lq.jpg',
  'https://i.imgur.com/alvWNnS.jpg',
  'https://i.imgur.com/Fvq7QFR.jpg',
  'https://i.imgur.com/i2ntzrS.jpg',
  'https://i.imgur.com/i85W1Q8.jpg',
  'https://i.imgur.com/ylqCqY7.jpg',
  'https://i.imgur.com/N74vsAU.jpg',
  'https://i.imgur.com/8fm7GDB.jpg',
  'https://i.imgur.com/YWlgxCz.jpg',
  'https://i.imgur.com/REr2A6L.jpg'
]

# add the negative example images to the model
for negative_example in PHISH_NEGATIVES:
    clarifai.negative(negative_example, concept_name)

# train the model
clarifai.train(concept_name)


PHISH_EXAMPLES = [
  'http://www.sofort-billiger.de/getraenke/red-bull-dose.jpg',
  'https://clarifai-test.s3.amazonaws.com/DSC01226-e1311293061704.jpg',
  'http://www.globus-drive.de/medias/sys_master/products/8806071795742/9002490206840_1.jpg'
]

NOT_PHISH = [
  'https://clarifai-test.s3.amazonaws.com/2141620332_2b741028b3.jpg',
  'https://clarifai-test.s3.amazonaws.com/grateful_dead230582_15-52.jpg'
]

# If everything works correctly, the confidence that true positive images are of Phish should be
# significantly greater than 0.5, which is the same as choosing at random. The confidence that true
# negative images are Phish should be significantly less than 0.5.

# use the model to predict whether the test images are Phish or not
for test in PHISH_EXAMPLES + NOT_PHISH:
    result = clarifai.predict(test, concept_name)
    print(result['status']['message'], "%0.3f" % result['urls'][0]['score'], result['urls'][0]['url'])

# Our output is the following. Your results will vary as there are some non-deterministic elements
# of the algorithms used.

# Success 0.797 http://phishthoughts.com/wp-content/uploads/2012/07/photo-1-11-e1342391144673.jpg
# Success 0.706 http://bobmarley.cdn.junip.com/wp-content/uploads/2014/10/DSC01226-e1311293061704.jpg
# Success 0.356 http://farm3.static.flickr.com/2161/2141620332_2b741028b3.jpg
# Success 0.273 http://www.mediaspin.com/joel/grateful_dead230582_15-52.jpg
